import { fetcher } from '../fetcher';

export const resetBlog = (blogId: string) => {
  return fetcher(`/api/blogs/${blogId}`, {
    method: 'PATCH',
    schema: null,
  });
};
