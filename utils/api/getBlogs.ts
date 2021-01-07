import { object, array } from 'yup';

import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

export type IsPublic = 'all' | 'public' | 'hidden';

const publicQuery: Record<IsPublic, string> = {
  all: '',
  public: '?isPublic=true',
  hidden: '?isPublic=false',
};

const getBlogsSchema = object({
  data: array(blogSchema),
});

export const getBlogs = async (isPublic: IsPublic) =>
  (
    await fetcher(`/api/blogs${publicQuery[isPublic]}`, {
      schema: getBlogsSchema,
      method: 'GET',
    })
  ).data;
