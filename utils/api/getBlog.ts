import type { Blog } from '@prisma/client';

import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

export const getBlog = (blogId: string) => {
  return fetcher<Blog>(`/api/blogs/${blogId}`, { method: 'GET', schema: blogSchema });
};
