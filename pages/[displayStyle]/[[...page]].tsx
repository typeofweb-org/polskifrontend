import {
  getArticlesForList,
  getArticlesForGrid,
  getLastArticlePage,
  getLastBlogPage,
} from '../../api-helpers/articles';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { HTTPNotFound } from '../../api-helpers/errors';
import { Layout } from '../../components/Layout';
import { Main } from '../../components/Main/Main';
import { MAX_PAGES, REVALIDATION_TIME } from '../../contants';
import type { InferGetStaticPropsContext, InferGetStaticPropsType2 } from '../../types';
import { getPagesArray } from '../../utils/array-utils';
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
      <Main {...props} />
    </Layout>
  );
}
export const getStaticPaths = async () => {
  try {
    const prisma = await openConnection();
    const [gridLastPage, listLastPage] = await Promise.all([
      await getLastBlogPage(prisma),
      await getLastArticlePage(prisma),
    ]);
    const gridPages = getPagesArray(gridLastPage, MAX_PAGES);
    const listPages = getPagesArray(listLastPage, MAX_PAGES);
    const paths = [
      ...gridPages.map((page) => ({ params: { displayStyle: 'grid' as const, page: [page] } })),
      ...listPages.map((page) => ({ params: { displayStyle: 'list' as const, page: [page] } })),
    ];
    return {
      paths,
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
      const lastPage = await getLastArticlePage(prisma);
      const pageNumber = !params.page ? `${lastPage}` : params.page[0];
      const { data: articlesFromDb } = await getArticlesForList(prisma, pageNumber);
      const articles = articlesFromDb.map(addExcerptToArticle);
      return {
        props: {
          articles,
          displayStyle: 'list' as const,
          isLastPage: +pageNumber === lastPage,
          pageNumber,
        },
        revalidate: REVALIDATION_TIME,
      };
    }

    const { data: blogsFromDb, nextCursor } = await getArticlesForGrid(prisma, params?.page[0]);
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
