import type { InferGetStaticPropsType } from 'next';

import { closeConnection, openConnection } from '../api-helpers/db';
import { Layout } from '../components/Layout';

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;
export default function HomePage({ blogs }: HomePageProps) {
  return (
    <Layout>
      <h1>Siema!</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.name}
            <ul>
              {blog.articles.map((article) => (
                <li key={article.id}>{article.title}</li>
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

export const getStaticProps = async () => {
  try {
    const prisma = await openConnection();

    // data for tiles/grid
    const blogs = await prisma.blog.findMany({
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

    return { props: { blogs }, revalidate: REVALIDATION_TIME };
  } finally {
    await closeConnection();
  }
};
