import { getArticleBySlug, getArticles } from '../../api-helpers/articles';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { HTTPNotFound } from '../../api-helpers/errors';
import { DEFAULT_ARTICLES } from '../../api-helpers/general-feed';
import { Layout } from '../../components/Layout';
import type { InferGetStaticPropsContext, InferGetStaticPropsType2 } from '../../types';

export default function ArticlePage({ article }: InferGetStaticPropsType2<typeof getStaticProps>) {
  return <Layout title="dupa">{article.title}</Layout>;
}

export const getStaticProps = async ({
  params,
}: InferGetStaticPropsContext<typeof getStaticPaths>) => {
  try {
    const prisma = await openConnection();

    const article = await getArticleBySlug(prisma, params!.slug);

    return {
      props: {
        article,
      },
    };
  } catch (err) {
    if (err instanceof HTTPNotFound) {
      return { props: undefined, notFound: true as const };
    }

    throw err;
  } finally {
    await closeConnection();
  }
};

export const getStaticPaths = async () => {
  try {
    const prisma = await openConnection();

    const articles = await getArticles(prisma, DEFAULT_ARTICLES);

    return {
      paths: [
        ...articles.map(({ slug }) => ({
          params: {
            slug,
          },
        })),
      ],
      fallback: 'blocking' as const,
    };
  } finally {
    await closeConnection();
  }
};
