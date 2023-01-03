import type { fetchAdminBlogsList } from './utils/fetchAdminBlogsList';
import type { fetchArticlesForList } from './utils/fetchArticlesForList';
import type { fetchBlogsForGrid } from './utils/fetchBlogsForGrid';
import type { addSanitizedDescriptionToArticle } from './utils/sanitize-utils';
import type { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import type { ParsedUrlQuery } from 'querystring';

export type Article = Awaited<ReturnType<typeof fetchArticlesForList>>['articles'][0];
export type SanitizedArticle = ReturnType<typeof addSanitizedDescriptionToArticle>;
export type Blog = Awaited<ReturnType<typeof fetchBlogsForGrid>>['blogs'][0];
export type AdminTableBlogsRow = Awaited<ReturnType<typeof fetchAdminBlogsList>>[0];
export type BlogsType = 'public' | 'nonpublic' | 'all';

export type DisplayStyle = 'list' | 'grid';

// make params more typesafe
type GetStaticPathsResult2<P extends ParsedUrlQuery = ParsedUrlQuery> = {
  readonly paths: ReadonlyArray<{ readonly params: P; readonly locale?: string }>;
  readonly fallback: boolean | 'blocking';
};

export type InferGetStaticPathsResult<T> = T extends (
  context: GetStaticPathsContext,
) => GetStaticPathsResult2<infer P> | Promise<GetStaticPathsResult2<infer P>>
  ? P
  : never;

export type InferGetStaticPropsContext<T> = GetStaticPropsContext<InferGetStaticPathsResult<T>>;

export type InferGetStaticPropsType2<T> = T extends (
  ...args: readonly any[]
) => Promise<{ readonly props: infer P }> | { readonly props: infer P }
  ? NonNullable<P>
  : never;
