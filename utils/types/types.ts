import type { fetchAdminBlogsList } from '../fetchAdminBlogsList';
import type { fetchArticlesForList } from '../fetchArticlesForList';
import type { fetchBlogsForGrid } from '../fetchBlogsForGrid';
import type { addSanitizedDescriptionToArticle } from '../sanitize-utils';

export type SanitizedArticle = ReturnType<typeof addSanitizedDescriptionToArticle>;
export type Article = Awaited<ReturnType<typeof fetchArticlesForList>>['articles'][number];
export type Blog = Awaited<ReturnType<typeof fetchBlogsForGrid>>['blogs'][number];
export type ArticleFromBlog = Blog['articles'][0];
export type BlogFromArticle = Article['blog'];
export type AdminTableBlogsRow = Awaited<ReturnType<typeof fetchAdminBlogsList>>[number];
export type BlogsType = 'public' | 'nonpublic' | 'all';

export type DisplayStyle = 'list' | 'grid';
