import Crypto from 'crypto';

import Boom from '@hapi/boom';
import { string, object } from 'yup';

import { withAsync, withDb, withMethods, withValidation } from '../../api-helpers/api-hofs';
import { getConfig } from '../../api-helpers/config';
import { updateFeeds } from '../../api-helpers/feedFunctions';

export default withAsync(
  withMethods({
    // VERCEL CRON
    GET: withDb(async (req) => {
      const isSecretValid = Crypto.timingSafeEqual(
        Buffer.from(req.headers.authorization ?? ''),
        Buffer.from(`Bearer ${getConfig('CRON_SECRET')}`),
      );
      if (!isSecretValid) {
        throw Boom.unauthorized();
      }
      await updateFeeds(req.db);
      return null;
    }),
    // LOCAL
    PATCH: withValidation({
      body: object({ secret: string().required() }).required(),
    })(
      withDb(async (req) => {
        try {
          const isSecretValid = Crypto.timingSafeEqual(
            Buffer.from(req.body.secret),
            Buffer.from(getConfig('FEED_UPDATE_SECRET')),
          );

          if (!isSecretValid) {
            throw Boom.unauthorized();
          }
        } catch (err) {
          throw Boom.isBoom(err) ? err : Boom.unauthorized();
        }

        await updateFeeds(req.db);
        return null;
      }),
    ),
  }),
);
