import type { IncomingMessage } from 'http';

import Boom from '@hapi/boom';
import type { Member, PrismaClient, UserRole } from '@prisma/client';
import * as Sentry from '@sentry/node';
import type { User } from '@supabase/gotrue-js';
import type { NextApiResponse, NextApiRequest } from 'next';
import { object } from 'yup';
import type { AnySchema, ObjectSchema, InferType } from 'yup';

import { supabase } from '../utils/api/initSupabase';
import { initSentry } from '../utils/sentry';

import { closeConnection, openConnection } from './db';
import { logger } from './logger';
import { handlePrismaError } from './prisma-helper';

type SomeSchema = Record<string, AnySchema<any, any, any>>;
type AllAllowedFields = 'body' | 'query';

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

function unsafe__set<T extends object, P extends string, V>(obj: T, path: P, value: V) {
  (obj as Record<string, unknown>)[path] = value;
  return obj as T & { readonly [K in P]: V };
}

type OurNextApiRequest = Omit<NextApiRequest, AllAllowedFields> & IncomingMessage;

export const withValidation = <
  Body extends SomeSchema,
  Query extends SomeSchema,
  Schema extends
    | {}
    | { readonly body: ObjectSchema<Body> }
    | { readonly query: ObjectSchema<Query> }
    | { readonly body: ObjectSchema<Body>; readonly query: ObjectSchema<Query> }
>(
  schema: Schema,
) => {
  const schemaObj = object(schema).unknown(true).required();

  return <R extends OurNextApiRequest>(
    handler: (
      req: R & InferType<typeof schemaObj> & { readonly _rawBody: any },
      res: NextApiResponse,
    ) => unknown,
  ) => async (req: R, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const rawBody = (req as any).body;

    try {
      // eslint-disable-next-line no-var
      var validatedValues = await schemaObj.validate(req, { abortEarly: false });
    } catch (err) {
      throw Boom.badRequest((err as Error | undefined)?.message, err);
    }

    return handler(unsafe__set(validatedValues, '_rawBody', rawBody) as any, res);
  };
};

export const withAsync = (
  handler: (req: OurNextApiRequest, res: NextApiResponse) => Promise<unknown> | unknown,
) => {
  initSentry();

  return async <R extends OurNextApiRequest>(req: R, res: NextApiResponse) => {
    try {
      const result = await handler(req, res);

      if (res.writableEnded) {
        return;
      }

      if (result === undefined) {
        logger.error(
          `Handler returned undefined. If you intended to return an empty response, return null instead. ${handler
            .toString()
            .slice(0, 50)}`,
        );
        return res.status(500).end();
      }

      if (result === null) {
        return res.status(204).end();
      }

      return res.json(result);
    } catch (err) {
      if (Boom.isBoom(err)) {
        Object.entries(err.output.headers).forEach(([key, val]) => val && res.setHeader(key, val));
        return res.status(err.output.statusCode).json(err.output.payload);
      } else {
        logger.error(err);
        Sentry.captureException(err);
        return res.status(500).json(err);
      }
    } finally {
      await Sentry.flush(2000).catch(() => {});
    }
  };
};

export const withDb = <R extends OurNextApiRequest>(
  handler: (
    req: R & { readonly db: PrismaClient },
    res: NextApiResponse,
  ) => Promise<unknown> | unknown,
) => async (req: R, res: NextApiResponse) => {
  try {
    const prisma = openConnection();
    return handler(unsafe__set(req, 'db', prisma), res);
  } catch (err) {
    handlePrismaError(err);
  } finally {
    await closeConnection();
  }
};

export function withAuth(role?: UserRole) {
  return <R extends OurNextApiRequest>(
    handler: (
      req: R & { readonly session: { readonly user: User; readonly member: Member } } & {
        readonly db: PrismaClient;
      },
      res: NextApiResponse,
    ) => unknown,
  ) =>
    withDb<R>(async (req, res) => {
      const session = await supabase.auth.api.getUserByCookie(req);

      if (!session?.user) {
        throw Boom.unauthorized();
      }

      const member = await req.db.member.findUnique({ where: { id: session.user.id } });
      if (!member || (role && member.role !== role)) {
        throw Boom.unauthorized();
      }

      return handler(unsafe__set(req, 'session', { user: session.user, member }), res);
    });
}

export function withMethods<R extends OurNextApiRequest>(
  methods: {
    readonly [key in HTTPMethod]?: (req: R, res: NextApiResponse) => unknown;
  },
) {
  return (req: R, res: NextApiResponse) => {
    const reqMethod = req.method as HTTPMethod;
    const handler = methods[reqMethod];
    if (handler) {
      return handler(req, res);
    }
    throw Boom.notFound();
  };
}
