import {
  getArticlesForList,
  getArticlesForGrid,
  getArticlesPaginationForGrid,
  getArticlesPaginationForList,
} from '../../api-helpers/articles';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { HTTPNotFound } from '../../api-helpers/errors';
import { Layout } from '../../components/Layout';
import { MainTiles } from '../../components/MainTiles/MainTiles';
import type { InferGetStaticPropsContext, InferGetStaticPropsType2 } from '../../types';
import { addExcerptToArticle } from '../../utils/excerpt-utils';

export type HomePageProps = InferGetStaticPropsType2<typeof getStaticProps>;

const displayStyleToTitle: Record<HomePageProps['displayStyle'], string> = {
  grid: 'siatka',
  list: 'lista',
};

export default function HomePage(props: HomePageProps) {
  return (
    <Layout
      title={`Polski Frontend – ${
        displayStyleToTitle[props.displayStyle]
      } artykułów z polskich blogów frontendowych`}
      titleTemplate=""
    >
      <MainTiles {...props} />
    </Layout>
  );
}

export const REVALIDATION_TIME = 15 * 60; // 15 minutes
const MAX_PAGES = 5;

export const getStaticPaths = async () => {
  try {
    const prisma = await openConnection();

    const [gridCursors, listCursors] = await Promise.all([
      await getArticlesPaginationForGrid(prisma),
      await getArticlesPaginationForList(prisma),
    ]);

    const paths = [
      ...gridCursors
        .map((cursor) => ({ params: { displayStyle: 'grid' as const, cursor } }))
        .slice(0, MAX_PAGES),
      ...listCursors
        .map((cursor) => ({ params: { displayStyle: 'list' as const, cursor } }))
        .slice(0, MAX_PAGES),
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
      const { data: articlesFromDb, nextCursor } = await getArticlesForList(prisma, params?.cursor);
      const articles = articlesFromDb.map(addExcerptToArticle);
      return {
        props: { articles, displayStyle: 'list' as const, nextCursor },
        revalidate: REVALIDATION_TIME,
      };
    }

    const { data: blogsFromDb, nextCursor } = await getArticlesForGrid(prisma, params?.cursor);
    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map(addExcerptToArticle),
      } as const;
    });
    return {
      props: { blogs, displayStyle: 'grid' as const, nextCursor },
      revalidate: REVALIDATION_TIME,
    } as const;
  } catch (err) {
    if (err instanceof HTTPNotFound) {
      return { props: undefined, notFound: true as const };
    }
    throw err;
  } finally {
    await closeConnection();
  }
};
