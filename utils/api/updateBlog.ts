import type { BlogIdRequestBody } from '../../pages/api/blogs/[blogId]';
import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

export const updateBlog = (blogId: string, body: BlogIdRequestBody) => {
  body.creatorEmail = body.creatorEmail || null;

  return fetcher(`/api/blogs/${blogId}`, {
    method: 'PUT',
    schema: blogSchema,
    body,
  });
};
