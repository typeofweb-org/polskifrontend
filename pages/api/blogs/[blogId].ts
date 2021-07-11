import Boom from '@hapi/boom';
import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';

import { withAsync, withValidation, withAuth, withMethods } from '../../../api-helpers/api-hofs';
import { addContentCreator } from '../../../api-helpers/contentCreatorFunctions';

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

      PUT: withValidation({
        query: object({
          blogId: cuidValidator,
        }),
        body: blogIdRequestBody,
      })(async (req) => {
        const blog = await req.db.blog.update({
          where: {
            id: req.query.blogId,
          },
          data: req.body,
        });

        return blog;
      }),

      PATCH: withValidation({
        query: object({
          blogId: cuidValidator,
        }),
      })(async (req) => {
        const existingBlog = await req.db.blog.findUnique({ where: { id: req.query.blogId } });
        await req.db.article.deleteMany({ where: { blogId: req.query.blogId } });
        await req.db.blog.delete({ where: { id: req.query.blogId } });

        if (!existingBlog) {
          return null;
        }

        const blog = await addContentCreator(existingBlog.href, existingBlog.creatorEmail!, req.db);

        const savedBlog = await req.db.blog.update({
          data: { ...blog, isPublic: existingBlog.isPublic },
          where: { id: blog.id },
        });

        return savedBlog;
      }),

      DELETE: withValidation({
        query: object({
          blogId: cuidValidator,
        }),
      })(async (req) => {
        await req.db.article.deleteMany({ where: { blogId: req.query.blogId } });
        await req.db.blog.delete({ where: { id: req.query.blogId } });

        return null;
      }),
    }),
  ),
);
