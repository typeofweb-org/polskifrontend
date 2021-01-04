import type { BlogIdRequestBody } from '../../pages/api/blogs/[blogId]';

export const updateBlog = (blogId: string, body: BlogIdRequestBody) => {
  body.slug = body.slug || null;
  body.favicon = body.favicon || null;
  body.creatorEmail = body.creatorEmail || null;

  return fetch(`/api/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};
