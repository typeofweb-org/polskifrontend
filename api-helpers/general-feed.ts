import { Feed } from 'feed';

import { prisma } from './db';

export const DEFAULT_ARTICLES = 30;

const publicUrl = `https://${process.env.NEXT_PUBLIC_URL!}`;

export async function getGeneralFeed() {
  const articles = await prisma.article.findMany({
    where: { blog: { isPublic: true } },
    take: DEFAULT_ARTICLES,
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      blog: true,
    },
  });

  const feed = new Feed({
    title: 'Polski Frontend',
    description:
      'Ogólny RSS Polskiego Frontendu - serwisu skupiającego polskie strony, blogi i serwisy na temat frontendu!',
    id: publicUrl,
    link: publicUrl,
    language: 'pl',
    image: `${publicUrl}/logo.png`,
    favicon: `${publicUrl}/favicon.ico`,
    copyright: 'Copyright@2020 – Type of Web',
    updated: articles[0].updatedAt,
    generator: 'Polski Frontend',
    feedLinks: {
      rss: `${publicUrl}/feed`,
    },
    author: {
      name: 'Polski Frontend',
      link: publicUrl,
    },
  });

  articles.forEach((article) => {
    feed.addItem({
      title: article.title,
      description: article.description || undefined,
      author: [{ name: article.blog.name, link: article.blog.href }],
      link: article.href,
      date: article.publishedAt,
      id: article.href,
    });
  });

  return feed.rss2();
}
