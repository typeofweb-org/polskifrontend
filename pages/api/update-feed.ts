import { string, object } from 'yup';
import { withAsync, withValidation } from '../../api/with-validation';
import Crypto from 'crypto';
import { getConfig } from '../../api/config';
import Boom from '@hapi/boom';
import { updateFeeds } from '../../api/feedFunctions';

export default withAsync(
  withValidation({
    body: object({ secret: string().required() }).required(),
  })(async (req) => {
    if (req.method !== 'PATCH') {
      throw Boom.notFound();
    }

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

    await updateFeeds();
    return null;
  }),
);
