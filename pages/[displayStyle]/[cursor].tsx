import type { InferGetStaticPropsType } from 'next';

import {
  getArticlesForList,
  getArticlesForGrid,
  getArticlesPaginationForGrid,
  getArticlesPaginationForList,
} from '../../api-helpers/articles';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { Layout } from '../../components/Layout';
import { MainTiles } from '../../components/MainTiles/MainTiles';
import type { InferGetStaticPropsContext } from '../../types';
import { addExcerptToArticle } from '../../utils/excerpt-utils';

export type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function HomePage(props: HomePageProps) {
  return (
    <Layout>
      <MainTiles {...props} />
    </Layout>
  );
}

const REVALIDATION_TIME = 15 * 60; // 15 minutes

export const getStaticPaths = async () => {
  try {
    const prisma = await openConnection();

    const [gridCursors, listCursors] = await Promise.all([
      await getArticlesPaginationForGrid(prisma),
      await getArticlesPaginationForList(prisma),
    ]);

    const paths = [
      ...gridCursors.map((cursor) => ({ params: { displayStyle: 'grid' as const, cursor } })),
      ...listCursors.map((cursor) => ({ params: { displayStyle: 'list' as const, cursor } })),
    ];

    return {
      paths: paths,
      fallback: 'blocking' as const,
    };
  } finally {
    await closeConnection();
  }
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPropsContext<typeof getStaticPaths>) => {
  try {
    const prisma = await openConnection();

    if (params?.displayStyle === 'list') {
      const { data: articlesFromDb, cursor } = await getArticlesForList(prisma, params?.cursor);
      const articles = articlesFromDb.map(addExcerptToArticle);
      return {
        props: { articles, displayStyle: 'list' as const, cursor },
        revalidate: REVALIDATION_TIME,
      };
    }

    const { data: blogsFromDb, cursor } = await getArticlesForGrid(prisma, params?.cursor);
    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map(addExcerptToArticle),
      };
    });
    return {
      props: { blogs, displayStyle: 'grid' as const, cursor },
      revalidate: REVALIDATION_TIME,
    };
  } finally {
    await closeConnection();
  }
};
