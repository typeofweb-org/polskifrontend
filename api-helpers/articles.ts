import type { PrismaClient } from '@prisma/client';

export const TILES_BLOGS_PER_PAGE = 4;
export const TILES_ARTICLES_PER_BLOG = 5;
export const LIST_ARTICLES_PER_PAGE = 20;

export const getArticlesForGrid = (prisma: PrismaClient) => {
  return prisma.blog.findMany({
    take: TILES_BLOGS_PER_PAGE,
    orderBy: {
      lastUpdateDate: 'desc',
    },
    include: {
      articles: {
        take: TILES_ARTICLES_PER_BLOG,
        orderBy: {
          publishedAt: 'desc',
        },
      },
    },
  });
};

export const getArticlesForList = (prisma: PrismaClient) => {
  return prisma.article.findMany({
    take: LIST_ARTICLES_PER_PAGE,
    orderBy: {
      publishedAt: 'desc',
    },
    include: {
      blog: true,
    },
  });
};
