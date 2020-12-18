import { AllHtmlEntities } from 'html-entities';
import type { InferGetStaticPropsType } from 'next';
import Xss from 'xss';

import { closeConnection, openConnection } from '../api-helpers/db';
import { ArticleTile } from '../components/ArticleTile/ArticleTile';
import { Layout } from '../components/Layout';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function HomePage({ blogs }: HomePageProps) {
  return (
    <Layout>
      <h1>Siema!</h1>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.name}
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {blog.articles.map((article) => (
                <li key={article.id}>
                  <ArticleTile
                    title={article.title}
                    blogName={blog.name}
                    publishedAt={article.publishedAt}
                    excerpt={article.excerpt}
                    url={article.href}
                    slug={article.slug}
                    favicon={blog.favicon || undefined}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

const BLOGS_PER_PAGE = 4;
const ARTICLES_PER_BLOG = 5;
const REVALIDATION_TIME = 15 * 60; // 15 minutes
const EXCERPT_MAX_WORDS = 50;

function removeShortWordsFromTheEndReducer(
  { done, text }: { readonly done: boolean; readonly text: string },
  lastWord: string,
) {
  if (done || lastWord.length >= 3) {
    return { done: true, text: lastWord + ' ' + text };
  }
  return { done: false, text };
}

function createExcerpt(text: string) {
  return AllHtmlEntities.decode(Xss(text, { stripIgnoreTag: true, whiteList: {} }))
    .trim()
    .split(/\s+/)
    .filter((word) => word)
    .slice(0, EXCERPT_MAX_WORDS)
    .reduceRight(removeShortWordsFromTheEndReducer, { done: false, text: '' }).text;
}

export const getStaticProps = async () => {
  try {
    const prisma = await openConnection();

    // data for tiles/grid
    const blogsFromDb = await prisma.blog.findMany({
      take: BLOGS_PER_PAGE,
      orderBy: {
        lastUpdateDate: 'desc',
      },
      include: {
        articles: {
          take: ARTICLES_PER_BLOG,
          orderBy: {
            publishedAt: 'desc',
          },
        },
      },
    });

    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map((article) => {
          return {
            ...article,
            excerpt: article.description ? createExcerpt(article.description) : '',
          };
        }),
      };
    });

    return { props: { blogs }, revalidate: REVALIDATION_TIME };
  } finally {
    await closeConnection();
  }
};
