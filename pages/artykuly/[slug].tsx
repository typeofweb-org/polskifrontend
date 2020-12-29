import { getArticleBySlug, getArticlesSlugs } from '../../api-helpers/articles';
import { closeConnection, openConnection } from '../../api-helpers/db';
import { HTTPNotFound } from '../../api-helpers/errors';
import { DEFAULT_ARTICLES } from '../../api-helpers/general-feed';
import { ArticleSection } from '../../components/ArticleSection/ArticleSection';
import { Layout } from '../../components/Layout';
import type { InferGetStaticPropsContext, InferGetStaticPropsType2 } from '../../types';
import { addSanitizedDescriptionToArticle } from '../../utils/sanitize-utils';

export type ArticlePageProps = InferGetStaticPropsType2<typeof getStaticProps>;

export default function ArticlePage({ article, date }: ArticlePageProps) {
  return (
    <Layout title={article.title} date={date}>
      <ArticleSection article={article} />
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: InferGetStaticPropsContext<typeof getStaticPaths>) => {
  try {
    const prisma = await openConnection();

    const article = await getArticleBySlug(prisma, params!.slug);

    return {
      props: {
        article: addSanitizedDescriptionToArticle(article),
        date: new Date().toISOString(),
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

    const articles = await getArticlesSlugs(prisma, DEFAULT_ARTICLES);

    return {
      paths: articles.map(({ slug }) => ({
        params: {
          slug,
        },
      })),
      fallback: 'blocking' as const,
    };
  } finally {
    await closeConnection();
  }
};
