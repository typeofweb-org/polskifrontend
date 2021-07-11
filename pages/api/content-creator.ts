import Boom from '@hapi/boom';
import { verify } from 'hcaptcha';
import { string, object } from 'yup';

import { withAsync, withDb, withMethods, withValidation } from '../../api-helpers/api-hofs';
import { addContentCreator } from '../../api-helpers/contentCreatorFunctions';
import { sendNewCreatorNotification } from '../../api-helpers/external-services/mailgun';

export default withAsync(
  withMethods({
    POST: withValidation({
      body: object({
        email: string().email().required(),
        contentURL: string().url().required(),
        captchaToken: string().required(),
      }).required(),
    })(
      withDb(async (req) => {
        const isTokenValid = await verify(
          process.env.CAPTCHA_SECRET_KEY as string,
          req.body.captchaToken,
        );
        if (!isTokenValid) {
          throw Boom.unauthorized();
        }

        // normalize url
        const url = new URL(req.body.contentURL).toString();

        const contentCreator = await addContentCreator(url, req.body.email, req.db);
        await sendNewCreatorNotification(contentCreator, req.db).catch(() => {});

        return null;
      }),
    ),
  }),
);
