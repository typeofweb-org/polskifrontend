import Boom from '@hapi/boom';
import { boolean, object } from 'yup';

import { withAsync, withValidation, withAuth, withDb } from '../../../api-helpers/api-hofs';

export default withAsync(
  withAuth('ADMIN')(
    withValidation({
      query: object({
        isPublic: boolean().optional(),
      }).optional(),
    })(
      withDb(async (req) => {
        if (req.method !== 'GET') {
          throw Boom.notFound();
        }

        const blogs = await req.db.blog.findMany({
          where: {
            isPublic: req.query.isPublic,
          },
        });

        return {
          data: blogs,
        };
      }),
    ),
  ),
);
