import type { InferGetStaticPropsType } from 'next';

import { getArticlesForList, getArticlesForGrid } from '../api-helpers/articles';
import { closeConnection, openConnection } from '../api-helpers/db';
import { Layout } from '../components/Layout';
import { MainTiles } from '../components/MainTiles/MainTiles';
import type { InferGetStaticPropsContext } from '../types';
import { addExcerptToArticle } from '../utils/excerpt-utils';

export type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HomePage(props: HomePageProps) {
  return (
    <Layout>
      <MainTiles {...props} />
    </Layout>
  );
}

const REVALIDATION_TIME = 15 * 60; // 15 minutes

export const getStaticPaths = () => {
  return {
    paths: [{ params: { displayStyle: 'grid' } }, { params: { displayStyle: 'list' } }] as const,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPropsContext<typeof getStaticPaths>) => {
  try {
    const prisma = await openConnection();

    if (params?.displayStyle === 'list') {
      const articlesFromDb = await getArticlesForList(prisma);
      const articles = articlesFromDb.map(addExcerptToArticle);
      return {
        props: { articles, displayStyle: 'list' as const },
        revalidate: REVALIDATION_TIME,
      };
    }

    const blogsFromDb = await getArticlesForGrid(prisma);
    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map(addExcerptToArticle),
      };
    });
    return { props: { blogs, displayStyle: 'grid' as const }, revalidate: REVALIDATION_TIME };
  } finally {
    await closeConnection();
  }
};
