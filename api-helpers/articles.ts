import type { PrismaClient } from '@prisma/client';

import {
  LIST_ARTICLES_PER_PAGE,
  TILES_ARTICLES_PER_BLOG,
  TILES_BLOGS_PER_PAGE,
} from '../constants';

import { HTTPNotFound } from './errors';

export const getArticlesForGrid = async (prisma: PrismaClient, page: number) => {
  const pageNumber = reversePageNumber(page, await getLastBlogPage(prisma));
  const blogs = await prisma.blog.findMany({
    where: { isPublic: true },
    skip: pageNumber * TILES_BLOGS_PER_PAGE,
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
  if (blogs.length === 0) throw new HTTPNotFound();

  return {
    data: blogs,
  };
};

export const getLastArticlePage = async (prisma: PrismaClient) => {
  const articlesCount = await prisma.article.count({
    where: { blog: { isPublic: true } },
  });
  return Math.ceil(articlesCount / LIST_ARTICLES_PER_PAGE);
};

export const getLastBlogPage = async (prisma: PrismaClient) => {
  const blogCount = await prisma.blog.count({
    where: { isPublic: true, lastArticlePublishedAt: { not: null } },
  });
  return Math.ceil(blogCount / TILES_BLOGS_PER_PAGE);
};
const reversePageNumber = (page: number, lastPage: number): number => {
  return lastPage - page;
};
export const getArticlesForList = async (prisma: PrismaClient, page: number) => {
  const pageNumber = reversePageNumber(page, await getLastArticlePage(prisma));
  const articles = await prisma.article.findMany({
    skip: pageNumber * LIST_ARTICLES_PER_PAGE,
    where: { blog: { isPublic: true } },
    take: LIST_ARTICLES_PER_PAGE,
    orderBy: {
      publishedAt: 'desc',
    },
    include: {
      blog: true,
    },
  });
  if (articles.length === 0) throw new HTTPNotFound();
  return {
    data: articles,
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
