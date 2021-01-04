import type { Blog } from '@prisma/client';

import { fetcher } from '../fetcher';

export const getBlog = (blogId: string): Promise<Blog> => {
  return fetcher<Blog>(`/api/blogs/${blogId}`);
};
