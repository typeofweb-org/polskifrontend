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

    const [gridPages, listPages] = await Promise.all([
      await getArticlesPaginationForGrid(prisma),
      await getArticlesPaginationForList(prisma),
    ]);

    const paths = [
      ...gridPages.map((page) => ({ params: { displayStyle: 'grid' as const, page } })),
      ...listPages.map((page) => ({ params: { displayStyle: 'list' as const, page } })),
    ];

    console.log({ gridPages });

    return {
      paths: paths,
      fallback: false,
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
      const { data: articlesFromDb, nextId } = await getArticlesForList(prisma, params?.page);
      const articles = articlesFromDb.map(addExcerptToArticle);
      return {
        props: { articles, displayStyle: 'list' as const, nextId },
        revalidate: REVALIDATION_TIME,
      };
    }

    const { data: blogsFromDb, nextId } = await getArticlesForGrid(prisma, params?.page);
    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map(addExcerptToArticle),
      };
    });
    return {
      props: { blogs, displayStyle: 'grid' as const, nextId },
      revalidate: REVALIDATION_TIME,
    };
  } finally {
    await closeConnection();
  }
};
