import { object, string, date, bool } from 'yup';

export const blogSchema = object({
  id: string().required(),
  name: string().required(),
  href: string().required(),
  rss: string().required(),
  slug: string().nullable(),
  lastUpdateDate: date().required(),
  favicon: string().nullable(),
  creatorEmail: string().nullable(),
  isPublic: bool().required(),
  lastArticlePublishedAt: date().nullable(),
  createdAt: date().required(),
  updatedAt: date().required(),
});
