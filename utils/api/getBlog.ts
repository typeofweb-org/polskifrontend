import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

export const getBlog = (blogId: string) => {
  return fetcher(`/api/blogs/${blogId}`, { method: 'GET', schema: blogSchema });
};
