import { getArticleBySlug, getArticlesSlugs } from '../../api-helpers/articles';
import { prisma } from '../../api-helpers/db';
import { HTTPNotFound } from '../../api-helpers/errors';
import { DEFAULT_ARTICLES } from '../../api-helpers/general-feed';
import { ArticleSection } from '../../components/ArticleSection/ArticleSection';
import { Layout } from '../../components/Layout';
import type { InferGetStaticPropsContext, InferGetStaticPropsType2 } from '../../types';
import { addSanitizedDescriptionToArticle } from '../../utils/sanitize-utils';

export type ArticlePageProps = InferGetStaticPropsType2<typeof getStaticProps>;

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <Layout title={article.title}>
      <ArticleSection article={article} />
    </Layout>
  );
}

export const getStaticProps = async ({
  params,
}: InferGetStaticPropsContext<typeof getStaticPaths>) => {
  try {
    const article = await getArticleBySlug(prisma, params!.slug);

    return {
      props: {
        article: addSanitizedDescriptionToArticle(article),
      },
    };
  } catch (err) {
    if (err instanceof HTTPNotFound) {
      return { props: undefined, notFound: true as const };
    }

    throw err;
  }
};

export const getStaticPaths = async () => {
  const articles = await getArticlesSlugs(prisma, DEFAULT_ARTICLES);

  return {
    paths: articles.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking' as const,
  };
};
