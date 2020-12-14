import Crypto from 'crypto';

import Boom from '@hapi/boom';
import type Hapi from '@hapi/hapi';
import Joi from 'joi';

import { getConfig } from '../../config';

import { updateFeeds } from './functions';

export const FeedPlugin: Hapi.Plugin<never> = {
  multiple: false,
  name: 'feed',
  version: '1.0.0',
  register(server) {
    server.route({
      method: 'PATCH',
      path: '/update',
      options: {
        tags: ['api', 'feed'],
        auth: false,
        validate: {
          payload: Joi.object({
            secret: Joi.string().required(),
          }).required(),
        },
      },
      async handler(request) {
        const payload = request.payload as { readonly secret: string };

        try {
          const isSecretValid = Crypto.timingSafeEqual(
            Buffer.from(payload.secret),
            Buffer.from(getConfig('FEED_UPDATE_SECRET')),
          );

          if (!isSecretValid) {
            throw Boom.unauthorized();
          }
        } catch (err) {
          throw Boom.isBoom(err) ? err : Boom.unauthorized();
        }

        await updateFeeds();
        return null;
      },
    });
  },
};
