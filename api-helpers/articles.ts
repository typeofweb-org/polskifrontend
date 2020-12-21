import type { PrismaClient } from '@prisma/client';

export const TILES_BLOGS_PER_PAGE = 4;
export const TILES_ARTICLES_PER_BLOG = 5;
export const LIST_ARTICLES_PER_PAGE = 20;

function last<T extends readonly R[], R>(arr: readonly [R, ...T]): R;
function last<T>(arr: readonly T[]): T | undefined;
function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}

export const getArticlesForGrid = async (prisma: PrismaClient, cursor?: string) => {
  const where = cursor
    ? {
        updatedAt: {
          lt: cursor,
        },
      }
    : {};

  const blogs = await prisma.blog.findMany({
    where,
    take: TILES_BLOGS_PER_PAGE,
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      articles: {
        take: TILES_ARTICLES_PER_BLOG,
        orderBy: {
          updatedAt: 'desc',
        },
      },
    },
  });

  const lastBlog = last(blogs);
  return { data: blogs, nextId: lastBlog?.updatedAt.toISOString() };
};

export const getArticlesPaginationForGrid = async (prisma: PrismaClient) => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      updatedAt: true,
    },
  });

  const pages = blogs.flatMap((blog, index) => {
    if (index === 0) {
      // default, first page
      return [''];
    }
    if (index % TILES_BLOGS_PER_PAGE === TILES_BLOGS_PER_PAGE - 1) {
      return [blog.updatedAt.toISOString()];
    }
    return [];
  });
  return pages;
};

export const getArticlesForList = async (prisma: PrismaClient, cursor?: string) => {
  const where = cursor
    ? {
        createdAt: {
          lt: cursor,
        },
      }
    : {};
  const articles = await prisma.article.findMany({
    where,
    take: LIST_ARTICLES_PER_PAGE,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      blog: true,
    },
  });

  const lastArticle = last(articles);
  return { data: articles, nextId: lastArticle?.createdAt.toISOString() };
};

export const getArticlesPaginationForList = async (prisma: PrismaClient) => {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      createdAt: true,
    },
  });

  const pages = articles.flatMap((article, index) => {
    if (index === 0) {
      // default, first page
      return [''];
    }
    if (index % LIST_ARTICLES_PER_PAGE === LIST_ARTICLES_PER_PAGE - 1) {
      return [article.createdAt.toISOString()];
    }
    return [];
  });
  return pages;
};
