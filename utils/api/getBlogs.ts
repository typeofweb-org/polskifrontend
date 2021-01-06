import type { Blog } from '@prisma/client';
import * as yup from 'yup';

import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

const getBlogsSchema = yup.object({
  data: yup.array(blogSchema),
});

export type PublicFilter = 'all' | 'public' | 'hidden';

const getPublicQuery: Record<PublicFilter, string> = {
  all: '',
  public: '?isPublic=true',
  hidden: '?isPublic=false',
};

export const getBlogs = async (isPublic: PublicFilter) => {
  return (
    await fetcher<{ readonly data: readonly Blog[] }>(`/api/blogs${getPublicQuery[isPublic]}`, {
      schema: getBlogsSchema,
      method: 'GET',
    })
  ).data;
};
