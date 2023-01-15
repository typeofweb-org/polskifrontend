import type { fetchAdminBlogsList } from './utils/fetchAdminBlogsList';
import type { fetchArticlesForList } from './utils/fetchArticlesForList';
import type { fetchBlogsForGrid } from './utils/fetchBlogsForGrid';
import type { addSanitizedDescriptionToArticle } from './utils/sanitize-utils';

export type Article = Awaited<ReturnType<typeof fetchArticlesForList>>['articles'][number];
export type Blog = Awaited<ReturnType<typeof fetchBlogsForGrid>>['blogs'][number];
export type ArticleFromBlog = Blog['articles'][0];
export type BlogFromArticle = Article['blog'];
export type SanitizedArticle = ReturnType<typeof addSanitizedDescriptionToArticle>;
export type AdminTableBlogsRow = Awaited<ReturnType<typeof fetchAdminBlogsList>>[number];
export type BlogsType = 'public' | 'nonpublic' | 'all';

export type DisplayStyle = 'list' | 'grid';
