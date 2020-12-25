import Boom from '@hapi/boom';
import { verify } from 'hcaptcha';
import { string, object } from 'yup';

import { withAsync, withValidation } from '../../api-helpers/api-hofs';
import { addContentCreator } from '../../api-helpers/contentCreatorFunctions';

export default withAsync(
  withValidation({
    body: object({
      email: string().optional(),
      contentURL: string().required().url(),
      captchaToken: string().required(),
    }).required(),
  })(async (req) => {
    if (req.method !== 'POST') {
      throw Boom.notFound();
    }
    try {
      const isTokenValid = await verify(
        process.env.CAPTCHA_SECRET_KEY as string,
        req.body.captchaToken,
      );
      if (!isTokenValid) {
        throw Boom.unauthorized();
      }
    } catch (err) {
      throw Boom.isBoom(err) ? err : Boom.unauthorized();
    }
    await addContentCreator(req.body.contentURL, req.body.email);
    return null;
  }),
);
