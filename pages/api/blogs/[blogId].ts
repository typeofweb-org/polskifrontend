import Boom from '@hapi/boom';
import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';

import {
  withAsync,
  withValidation,
  withAuth,
  withMethods,
  withDb,
} from '../../../api-helpers/api-hofs';

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
      })(
        withDb(async (req) => {
          const blog = await req.db.blog.findUnique({
            where: {
              id: req.query.blogId,
            },
          });

          if (blog) {
            return blog;
          }

          throw Boom.notFound();
        }),
      ),

      PUT: withValidation({
        query: object({
          blogId: cuidValidator,
        }),
        body: blogIdRequestBody,
      })(
        withDb(async (req) => {
          const blog = await req.db.blog.update({
            where: {
              id: req.query.blogId,
            },
            data: req.body,
          });

          return blog;
        }),
      ),
    }),
  ),
);
