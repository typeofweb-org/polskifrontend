import Boom from '@hapi/boom';
import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';

import { withAsync, withValidation, withAuth, withMethods } from '../../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../../api-helpers/db';
import { handlePrismaError } from '../../../api-helpers/prisma-helper';

const cuidValidator = string()
  .matches(/^c[a-zA-Z0-9]{24}$/)
  .required();

const blogIdRequestBody = object({
  href: string().url().required(),
  creatorEmail: string().nullable(),
  isPublic: boolean().required(),
}).required();

export type BlogIdRequestBody = InferType<typeof blogIdRequestBody>;

export default withAsync(
  withAuth('ADMIN')(
    withMethods({
      GET: withValidation({
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
          handlePrismaError(err);
          throw Boom.internal();
        } finally {
          await closeConnection();
        }
      }),

      PUT: withValidation({
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
          handlePrismaError(err);
          throw Boom.internal();
        } finally {
          await closeConnection();
        }
      }),
    }),
  ),
);
