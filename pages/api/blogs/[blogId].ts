import Boom from '@hapi/boom';
import { boolean, object, string } from 'yup';

import { withAsync, withValidation, withAuth } from '../../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../../api-helpers/db';
import { isPrismaError } from '../../../api-helpers/prisma-helper';

export default withAsync(
  withAuth('ADMIN')(
    withValidation({
      query: object({
        blogId: string().required(),
      }),
      body: object({
        name: string().required(),
        href: string().required(),
        rss: string().required(),
        slug: string().optional(),
        favicon: string().optional(),
        creatorEmail: string().optional(),
        isPublic: boolean().required(),
      }).required(),
    })(async (req) => {
      if (req.method !== 'PUT') {
        throw Boom.notFound();
      }
      try {
        const prisma = await openConnection();

        const blog = await prisma.blog.update({
          where: {
            id: req.query.blogId,
          },
          data: req.body,
        });

        return blog;
      } catch (err) {
        // Record not found
        if (isPrismaError(err) && err.code === 'P2001') {
          throw Boom.notFound();
        }
        // Conflict
        if (isPrismaError(err) && err.code === 'P2002') {
          throw Boom.conflict();
        }
        throw Boom.internal();
      } finally {
        await closeConnection();
      }
    }),
  ),
);
