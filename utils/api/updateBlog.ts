import type { BlogIdRequestBody } from '../../pages/api/blogs/[blogId]';
import { fetcher } from '../fetcher';

export const updateBlog = (blogId: string, body: BlogIdRequestBody) => {
  body.creatorEmail = body.creatorEmail || null;

  return fetcher(`/api/blogs/${blogId}`, {
    method: 'PUT',
    body,
  });
};
