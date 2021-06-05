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
import { MAX_PAGES, REVALIDATION_TIME } from '../../constants';
import type { InferGetStaticPropsContext, InferGetStaticPropsType2 } from '../../types';
import { getPagesArray } from '../../utils/array-utils';
import { addExcerptToArticle } from '../../utils/excerpt-utils';

export type HomePageProps = InferGetStaticPropsType2<typeof getStaticProps>;

const pageValidGuard = (page: string | undefined, lastPage: number) => {
  if (page === undefined) return lastPage;
  if (Number(page) === 0 || isNaN(Number(page))) throw new HTTPNotFound();
  if (Number(page) > lastPage) throw new HTTPNotFound();
  return Number(page);
};

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
      ...gridPages.map((page) => ({ params: { displayStyle: 'grid' as const, page } })),
      ...listPages.map((page) => ({ params: { displayStyle: 'list' as const, page } })),
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
      const pageNumber = pageValidGuard(params.page, lastPage);
      const { data: articlesFromDb } = await getArticlesForList(prisma, pageNumber);
      const articles = articlesFromDb.map(addExcerptToArticle);
      return {
        props: {
          articles,
          displayStyle: 'list' as const,
          isLastPage: pageNumber === lastPage,
          pageNumber,
        },
        revalidate: REVALIDATION_TIME,
      };
    }
    const lastPage = await getLastBlogPage(prisma);
    const pageNumber = pageValidGuard(params?.page, lastPage);
    const { data: blogsFromDb } = await getArticlesForGrid(prisma, pageNumber);
    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map(addExcerptToArticle),
      } as const;
    });
    return {
      props: {
        blogs,
        displayStyle: 'grid' as const,
        isLastPage: pageNumber === lastPage,
        pageNumber,
      },
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
