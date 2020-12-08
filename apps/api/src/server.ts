import Boom from '@hapi/boom';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Joi from 'joi';

import pkg from '../package.json';

import { getConfig, isProd, isStaging } from './config';
import { AuthPlugin } from './plugins/auth';
import { isPrismaError } from './prisma/prisma-helpers';

const getServer = () => {
  return new Hapi.Server({
    host: getConfig('HOST'),
    port: getConfig('PORT'),
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
      },
      response: {
        modify: true,
        options: {
          allowUnknown: false,
          convert: true,
        },
      },
      validate: {
        failAction(_request, _h, err) {
          if (isProd()) {
            throw Boom.badRequest(`Invalid request payload input`);
          } else {
            throw err;
          }
        },
      },
    },
  });
};

export const getServerWithPlugins = async () => {
  const server = getServer();
  server.validator(Joi);

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: `${pkg.name} Documentation`,
      version: getConfig('ENV') + '-' + pkg.version + '-',
      // fs.readFileSync(".version", "utf-8").trim(),
    },
    auth: false,
  };

  await server.register([
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  await server.register(
    {
      plugin: AuthPlugin,
      options: {
        cookieDomain: getConfig('COOKIE_DOMAIN'),
        isProduction: isProd() || isStaging(),
        cookiePassword: getConfig('COOKIE_PASSWORD'),
      },
    },
    {
      routes: {
        prefix: '/auth',
      },
    },
  );

  server.events.on({ name: 'request', channels: 'error' }, (_request, event, _tags) => {
    // const baseUrl = `${server.info.protocol}://${request.info.host}`;
    console.error(event.error);
  });

  server.ext('onPreResponse', ({ response }, h) => {
    const res = response as unknown;
    if (isPrismaError(res)) {
      switch (res.code) {
        case 'P2002':
          return Boom.conflict(JSON.stringify(res.meta));
      }
    }
    return h.continue;
  });

  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: {
        mode: 'try',
        strategy: 'session',
      },
    },
    handler(request) {
      if (request.auth.isAuthenticated) {
        return request.auth.credentials;
      }

      return `<h1>Stay awhile and listen.</h1> <h2>You're not logged in.</h2>`;
    },
  });

  return server;
};
