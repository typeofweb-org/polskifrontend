import Boom from '@hapi/boom';
import { verify } from 'hcaptcha';
import { string, object } from 'yup';

import { withAsync, withValidation } from '../../api-helpers/api-hofs';
import { addContentCreator } from '../../api-helpers/contentCreatorFunctions';
import { sendNewCreatorNotification } from '../../api-helpers/mailFunctions';

export default withAsync(
  withValidation({
    body: object({
      email: string().email().required(),
      contentURL: string().url().required(),
      captchaToken: string().required(),
    }).required(),
  })(async (req) => {
    if (req.method !== 'POST') {
      throw Boom.notFound();
    }

    const isTokenValid = await verify(
      process.env.CAPTCHA_SECRET_KEY as string,
      req.body.captchaToken,
    );
    if (!isTokenValid) {
      throw Boom.unauthorized();
    }

    // normalize url
    const url = new URL(req.body.contentURL).toString();

    const contentCreator = await addContentCreator(url, req.body.email);
    await sendNewCreatorNotification(contentCreator);

    return null;
  }),
);
