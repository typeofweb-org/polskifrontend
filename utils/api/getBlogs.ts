import type { Blog } from '@prisma/client';
import * as yup from 'yup';

import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

const getBlogsSchema = yup.object({
  data: yup.array(blogSchema),
});

export const getBlogs = async (publicQuery: string = '') =>
  (
    await fetcher<{ readonly data: readonly Blog[] }>(`/api/blogs${publicQuery}`, {
      schema: getBlogsSchema,
      method: 'GET',
    })
  ).data;
