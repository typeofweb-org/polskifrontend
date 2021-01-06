import Crypto from 'crypto';

import Boom from '@hapi/boom';
import { string, object } from 'yup';

import { withAsync, withDb, withMethods, withValidation } from '../../api-helpers/api-hofs';
import { getConfig } from '../../api-helpers/config';
import { updateBlogs } from '../../api-helpers/feedFunctions';

export default withAsync(
  withMethods({
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

        await updateBlogs(req.db);

        return null;
      }),
    ),
  }),
);
