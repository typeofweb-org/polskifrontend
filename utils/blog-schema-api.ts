import * as yup from 'yup';

export const blogSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  href: yup.string().required(),
  rss: yup.string().required(),
  slug: yup.string().nullable(),
  lastUpdateDate: yup.date().required(),
  favicon: yup.string().nullable(),
  creatorEmail: yup.string().nullable(),
  isPublic: yup.bool().required(),
  lastArticlePublishedAt: yup.date().nullable(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});
