import Boom from '@hapi/boom';
import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';

import { withAsync, withValidation, withAuth, withMethods } from '../../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../../api-helpers/db';
import { isPrismaError } from '../../../api-helpers/prisma-helper';

const cuidValidator = string()
  .matches(/^c[a-zA-Z0-9]{24}$/)
  .required();

const blogIdRequestBody = object({
  name: string().required(),
  href: string().url().required(),
  rss: string().url().required(),
  slug: string().optional(),
  favicon: string().url().optional(),
  creatorEmail: string().optional(),
  isPublic: boolean().required(),
}).required();

export type BlogIdRequestBody = InferType<typeof blogIdRequestBody>;

export default withAsync(
  withAuth('ADMIN')(
    withMethods({
      get: withValidation({
        query: object({
          blogId: cuidValidator,
        }),
      })(async (req) => {
        try {
          const prisma = await openConnection();

          const blog = await prisma.blog.findUnique({
            where: {
              id: req.query.blogId,
            },
          });

          if (blog) {
            return blog;
          }

          throw Boom.notFound();
        } catch (err) {
          throw Boom.internal();
        } finally {
          await closeConnection();
        }
      }),

      put: withValidation({
        query: object({
          blogId: cuidValidator,
        }),
        body: blogIdRequestBody,
      })(async (req) => {
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
    }),
  ),
);
