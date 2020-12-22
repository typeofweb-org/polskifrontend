import type { ParsedUrlQuery } from 'querystring';

import type { GetStaticPathsContext, GetStaticPropsContext } from 'next';

import type { HomePageProps } from './pages/[displayStyle]/[cursor]';

export type HomePageBlog = NonNullable<HomePageProps['blogs']>[number];
export type HomePageArticle = NonNullable<HomePageBlog['articles']>[number];

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
) => Promise<{ readonly props: infer P }>
  ? NonNullable<P>
  : never;
