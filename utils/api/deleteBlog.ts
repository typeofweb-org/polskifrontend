import { fetcher } from '../fetcher';

export const deleteBlog = (blogId: string) => {
  return fetcher(`/api/blogs/${blogId}`, {
    method: 'DELETE',
    schema: null,
  });
};
