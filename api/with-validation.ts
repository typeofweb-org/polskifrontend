import Boom from '@hapi/boom';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { object } from 'yup';
import type { AnySchema, ObjectSchema, InferType } from 'yup';

import { logger } from './logger';

type SomeSchema = Record<string, AnySchema<any, any, any>>;
type AllAllowedFields = 'body' | 'query';

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
  const schemaObj = object(schema).required();
  return (
    handler: (
      req: Omit<NextApiRequest, AllAllowedFields> & InferType<typeof schemaObj>,
      res: NextApiResponse,
    ) => unknown,
  ) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // eslint-disable-next-line no-var
      var validatedValues = await schemaObj.validate(req, { abortEarly: false });
    } catch (err) {
      throw Boom.badRequest((err as Error | undefined)?.message, err);
    }

    Object.keys(validatedValues).forEach((key) => {
      req[key as AllAllowedFields] = validatedValues[key as keyof typeof schema];
    });
    return handler(validatedValues as any, res);
  };
};

export const withAsync = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>,
): NextApiHandler => async (req, res) => {
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
      Object.entries(err.output.headers).forEach(([key, val]) => res.setHeader(key, val));
      return res.status(err.output.statusCode).json(err.output.payload);
    } else {
      return res.status(500).json(err);
    }
  }
};
