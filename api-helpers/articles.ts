import type { PrismaClient } from '@prisma/client';

import { LIST_ARTICLES_PER_PAGE, TILES_ARTICLES_PER_BLOG, TILES_BLOGS_PER_PAGE } from '../contants';
import { isIsoDate } from '../utils/date-utils';

import { cursorToText, textToCursor } from './cursor-encoding';
import { HTTPNotFound } from './errors';

function last<T extends readonly R[], R>(arr: readonly [R, ...T]): R;
function last<T>(arr: readonly T[]): T | undefined;
function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}

export const getArticlesForGrid = async (prisma: PrismaClient, cursor?: string) => {
  const date = cursor && cursorToText(cursor);

  if (date && !isIsoDate(date)) {
    throw new HTTPNotFound();
  }

  const where = date
    ? {
        lastArticlePublishedAt: {
          lt: date,
          not: null,
        },
      }
    : {};

  const blogs = await prisma.blog.findMany({
    where: { ...where, isPublic: true },
    take: TILES_BLOGS_PER_PAGE,
    orderBy: {
      lastArticlePublishedAt: 'desc',
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

  const lastBlog = last(blogs);
  return {
    data: blogs,
    nextCursor:
      lastBlog?.lastArticlePublishedAt &&
      textToCursor(lastBlog?.lastArticlePublishedAt.toISOString()),
  };
};

export const getArticlesPaginationForGrid = async (prisma: PrismaClient) => {
  const blogs = (await prisma.blog.findMany({
    where: { isPublic: true, lastArticlePublishedAt: { not: null } },
    orderBy: {
      lastArticlePublishedAt: 'desc',
    },
    select: {
      lastArticlePublishedAt: true,
    },
  })) as ReadonlyArray<{ readonly lastArticlePublishedAt: Date }>;

  const cursors = blogs.flatMap((blog, index) => {
    if (index % TILES_BLOGS_PER_PAGE === TILES_BLOGS_PER_PAGE - 1) {
      return [textToCursor(blog.lastArticlePublishedAt.toISOString())];
    }
    return [];
  });
  return cursors;
};

export const getLastArticlePage = async (prisma: PrismaClient) => {
  const articlesCount = await prisma.article.count({
    where: { blog: { isPublic: true } },
  });
  return Math.floor(articlesCount / LIST_ARTICLES_PER_PAGE);
};

export const getLastBlogPage = async (prisma: PrismaClient) => {
  const blogCount = await prisma.blog.count({
    where: { isPublic: true, lastArticlePublishedAt: { not: null } },
  });
  return Math.floor(blogCount / TILES_BLOGS_PER_PAGE);
};
export const getArticlesForList = async (prisma: PrismaClient, page?: string) => {
  if (page && isNaN(+page)) throw new Error('Page must be a number value');

  const articles = await prisma.article.findMany({
    skip: page ? +page * LIST_ARTICLES_PER_PAGE + 1 : 0,
    where: { blog: { isPublic: true } },
    take: LIST_ARTICLES_PER_PAGE,
    orderBy: {
      publishedAt: 'asc',
    },
    include: {
      blog: true,
    },
  });
  if (articles.length === 0) throw new HTTPNotFound();
  const lastArticle = last(articles);
  return {
    data: articles.reverse(),
    //isNextPageAvailable: page === lastPage ? false : true,
    nextCursor: lastArticle?.publishedAt && textToCursor(lastArticle?.publishedAt.toISOString()),
  };
};

export const getArticlesPaginationForList = async (prisma: PrismaClient) => {
  const articles = await prisma.article.findMany({
    where: {
      blog: { isPublic: true },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    select: {
      publishedAt: true,
    },
  });

  const cursors = articles.flatMap((article, index) => {
    if (index % LIST_ARTICLES_PER_PAGE === LIST_ARTICLES_PER_PAGE - 1) {
      return [textToCursor(article.publishedAt.toISOString())];
    }
    return [];
  });
  return cursors;
};

export const getArticlesSlugs = async (prisma: PrismaClient, limit?: number) => {
  const articles = await prisma.article.findMany({
    where: {
      blog: { isPublic: true },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    select: {
      slug: true,
    },
    take: limit,
  });

  return articles;
};

export const getArticleBySlug = async (prisma: PrismaClient, slug: string) => {
  const article = await prisma.article.findFirst({
    where: {
      slug,
      blog: { isPublic: true },
    },
    include: {
      blog: true,
    },
  });

  if (!article) {
    throw new HTTPNotFound();
  }

  return article;
};
