import { object, array } from 'yup';

import { blogSchema } from '../blog-schema-api';
import { fetcher } from '../fetcher';

const getBlogsSchema = object({
  data: array(blogSchema),
});

export const getBlogs = async (isPublic: 'true' | 'false' | undefined) => {
  const queryString = isPublic ? new URLSearchParams({ isPublic }).toString() : '';

  return (
    await fetcher(`/api/blogs?${queryString}`, {
      schema: getBlogsSchema,
      method: 'GET',
    })
  ).data;
};
