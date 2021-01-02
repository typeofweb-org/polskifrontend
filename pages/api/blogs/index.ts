import { boolean, object } from 'yup';

import { withAsync, withValidation, withAuth } from '../../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../../api-helpers/db';

export default withAsync(
  withAuth('ADMIN')(
    withValidation({
      query: object({
        isPublic: boolean().optional(),
      }).optional(),
    })(async (req) => {
      try {
        const prisma = await openConnection();

        const blogs = await prisma.blog.findMany({
          where: {
            isPublic: req.query.isPublic,
          },
        });

        return {
          blogs,
        };
      } finally {
        await closeConnection();
      }
    }),
  ),
);
