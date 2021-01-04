import type { BlogIdRequestBody } from '../../pages/api/blogs/[blogId]';

export const updateBlog = (blogId: string, body: BlogIdRequestBody) => {
  return fetch(`/api/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};
