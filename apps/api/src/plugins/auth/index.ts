import Bell from '@hapi/bell';
import Boom from '@hapi/boom';
import HapiAuthCookie from '@hapi/cookie';
import type Hapi from '@hapi/hapi';
import type { ProjectTypes } from '@polskifrontend/types';
import Bcrypt from 'bcrypt';
import ms from 'ms';

import type { Models } from '../../models';

import { loginPayloadSchema, meAuthResponseSchema, registerPayloadSchema } from './authSchemas';
import { loginUser, createUser } from './functions';
import { sessionInclude } from './includes';

const USER_REGISTERED_EVENT = 'auth:user:registered';

type AuthPluginOptions = {
  readonly cookiePassword: string;
  readonly isProduction: boolean;
  readonly cookieDomain: string;
};

declare module '@hapi/hapi' {
  interface AuthCredentials {
    readonly session?: Models['session'] & {
      readonly user: Omit<Models['user'], 'password'>;
    };
  }

  interface PluginProperties {
    readonly auth: {
      readonly loginUser: typeof loginUser;
      readonly createUser: typeof createUser;
    };
  }

  interface ServerEvents {
    on(
      criteria: typeof USER_REGISTERED_EVENT | ServerEventCriteria<typeof USER_REGISTERED_EVENT>,
      listener: (user: Models['user']) => void,
    ): void;
  }
}

export const AuthPlugin: Hapi.Plugin<AuthPluginOptions> = {
  multiple: false,
  name: 'auth',
  version: '1.0.0',
  async register(server, options) {
    server.expose('loginUser', loginUser);
    server.expose('createUser', createUser);

    await server.register(Bell);
    await server.register(HapiAuthCookie);
    server.event(USER_REGISTERED_EVENT);

    const cookieOptions: HapiAuthCookie.Options = {
      cookie: {
        name: 'session',
        password: options.cookiePassword,
        ttl: ms('7 days'),
        encoding: 'iron',
        isSecure: options.isProduction,
        isHttpOnly: true,
        clearInvalid: true,
        strictHeader: true,
        isSameSite: 'Lax',
        domain: options.cookieDomain,
        path: '/',
      },
      async validateFunc(request, session: { readonly id?: string } | undefined) {
        const sessionId = session?.id;
        if (!sessionId || !request) {
          return { valid: false };
        }

        await request.server.app.db.session.deleteMany({
          where: {
            validUntil: {
              lt: new Date(),
            },
          },
        });

        const sessionModel = await request.server.app.db.session.findOne({
          where: {
            id: sessionId,
          },
          include: sessionInclude,
        });

        if (!sessionModel) {
          request?.cookieAuth.clear();
          return { valid: false };
        }

        // await maybeUpdateSessionValidity(sessionModel);

        const scope = ['user', `user-${sessionModel.userId}`, sessionModel.user.role];

        return { valid: true, credentials: { session: sessionModel, scope } };
      },
    };
    server.auth.strategy('session', 'cookie', cookieOptions);
    server.auth.default({ strategy: 'session', mode: 'required' });

    server.route({
      method: 'POST',
      path: '/register',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
        validate: {
          payload: registerPayloadSchema,
        },
      },
      async handler(request) {
        if (request.auth.isAuthenticated) {
          throw Boom.teapot();
        }

        const { email, password } = request.payload as ProjectTypes['postAuthRegisterRequestBody'];

        await createUser(request, { email, password });

        return null;
      },
    });

    server.route({
      method: 'POST',
      path: '/login',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
        validate: {
          payload: loginPayloadSchema,
        },
      },
      async handler(request) {
        if (request.auth.isAuthenticated) {
          return null;
        }
        const { email, password } = request.payload as ProjectTypes['postAuthLoginRequestBody'];
        const user = await request.server.app.db.user.findOne({
          where: { email },
        });

        if (!user) {
          throw Boom.unauthorized();
        }

        const arePasswordsEqual = await Bcrypt.compare(password, user.password);

        if (!arePasswordsEqual) {
          throw Boom.unauthorized();
        }

        await loginUser(request, user);

        return null;
      },
    });

    server.route({
      method: 'POST',
      path: '/logout',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
      },
      async handler(request) {
        request.cookieAuth.clear();
        if (request.auth.credentials?.session) {
          await request.server.app.db.session.delete({
            where: {
              id: request.auth.credentials.session.id,
            },
          });
        }

        return null;
      },
    });

    server.route({
      method: 'GET',
      path: '/me',
      options: {
        tags: ['api', 'auth'],
        auth: {
          mode: 'try',
          strategy: 'session',
        },
        response: {
          schema: meAuthResponseSchema,
        },
      },
      handler(request) {
        if (request.auth.credentials?.session) {
          return { data: request.auth.credentials.session };
        }

        return { data: null };
      },
    });
  },
};
