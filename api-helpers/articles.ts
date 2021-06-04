import type { PrismaClient } from '@prisma/client';

import { LIST_ARTICLES_PER_PAGE, TILES_ARTICLES_PER_BLOG, TILES_BLOGS_PER_PAGE } from '../contants';

import { HTTPNotFound } from './errors';

function pageValidGuard(page: string | undefined): void {
  if (page === undefined) throw new HTTPNotFound('Page must be a number value');
  if (isNaN(+page)) throw new HTTPNotFound('Page must be a number value');
  return;
}

export const getArticlesForGrid = async (prisma: PrismaClient, page?: string) => {
  pageValidGuard(page);
  const blogs = await prisma.blog.findMany({
    where: { isPublic: true },
    skip: page ? +page * TILES_BLOGS_PER_PAGE + 1 : 0,
    take: TILES_BLOGS_PER_PAGE,
    orderBy: {
      lastArticlePublishedAt: 'asc',
    },
    include: {
      articles: {
        take: TILES_ARTICLES_PER_BLOG,
        orderBy: {
          publishedAt: 'asc',
        },
      },
    },
  });
  if (blogs.length === 0) throw new HTTPNotFound();

  return {
    data: blogs.reverse(),
  };
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
  pageValidGuard(page);
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
  return {
    data: articles.reverse(),
  };
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
