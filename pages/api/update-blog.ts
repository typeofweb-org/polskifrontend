import Boom from '@hapi/boom';
import { boolean, object, string } from 'yup';

import { withAsync, withValidation, withAuth } from '../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { isPrismaError } from '../../api-helpers/prisma-helper';

export default withAsync(
  withAuth('ADMIN')(
    withValidation({
      body: object({
        id: string().required(),
        name: string().optional(),
        href: string().optional(),
        rss: string().optional(),
        slug: string().optional(),
        favicon: string().optional(),
        creatorEmail: string().optional(),
        isPublic: boolean().optional(),
      }).required(),
    })(async (req) => {
      if (req.method !== 'PUT') {
        throw Boom.notFound();
      }
      try {
        const prisma = await openConnection();

        const blog = await prisma.blog.update({
          where: {
            id: req.body.id,
          },
          data: req.body,
        });

        return blog;
      } catch (err) {
        // Record not found
        if (isPrismaError(err) && err.code === 'P2001') {
          throw Boom.badData();
        }
        throw Boom.badRequest();
      } finally {
        await closeConnection();
      }
    }),
  ),
);
