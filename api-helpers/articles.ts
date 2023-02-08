import { v2 as Cloudinary } from 'cloudinary';

import {
  LIST_ARTICLES_PER_PAGE,
  TILES_ARTICLES_PER_BLOG,
  TILES_BLOGS_PER_PAGE,
} from '../constants';

import { HTTPNotFound } from './errors';
import { prisma } from './prisma/db';

// https://res.cloudinary.com/polskifrontend/image/fetch

export const getArticlesForGrid = async (page: number) => {
  const lastBlogPage = await getLastBlogPage();
  const pageNumber = reversePageNumber(page, lastBlogPage);

  const blogs = await prisma.blog.findMany({
    where: { isPublic: true },
    skip: pageNumber * TILES_BLOGS_PER_PAGE,
    take: TILES_BLOGS_PER_PAGE,
    orderBy: {
      lastArticlePublishedAt: 'desc',
    },
    select: {
      id: true,
      name: true,
      href: true,
      favicon: true,
      articles: {
        take: TILES_ARTICLES_PER_BLOG,
        orderBy: {
          publishedAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          publishedAt: true,
          href: true,
          slug: true,
        },
      },
    },
  });
  if (blogs.length === 0) {
    throw new HTTPNotFound();
  }

  return {
    data: blogs.map((blog) => {
      return replaceFaviconWithCdn(blog);
    }),
  };
};

export const getLastArticlePage = async () => {
  const articlesCount = await prisma.article.count({
    where: { blog: { isPublic: true } },
  });
  return Math.ceil(articlesCount / LIST_ARTICLES_PER_PAGE);
};

export const getLastBlogPage = async () => {
  const blogCount = await prisma.blog.count({
    where: { isPublic: true, lastArticlePublishedAt: { not: null } },
  });
  return Math.ceil(blogCount / TILES_BLOGS_PER_PAGE);
};

const reversePageNumber = (page: number, lastPage: number): number => {
  return lastPage - page;
};

export const getArticlesForList = async (page: number) => {
  const lastArticlePage = await getLastArticlePage();
  const pageNumber = reversePageNumber(page, lastArticlePage);

  const articles = await prisma.article.findMany({
    skip: pageNumber * LIST_ARTICLES_PER_PAGE,
    where: { blog: { isPublic: true } },
    take: LIST_ARTICLES_PER_PAGE,
    orderBy: {
      publishedAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      publishedAt: true,
      href: true,
      slug: true,
      blog: {
        select: {
          name: true,
          href: true,
          favicon: true,
        },
      },
    },
  });

  if (articles.length === 0) {
    throw new HTTPNotFound();
  }

  return {
    data: articles.map((article) => {
      return {
        ...article,
        blog: replaceFaviconWithCdn(article.blog),
      };
    }),
  };
};

export const getArticlesSlugs = async (limit?: number) => {
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

export const getArticleBySlug = async (slug: string) => {
  const article = await prisma.article.findFirst({
    where: {
      slug,
      blog: { isPublic: true },
    },
    select: {
      id: true,
      description: true,
      title: true,
      publishedAt: true,
      href: true,
      blog: {
        select: {
          href: true,
          name: true,
          favicon: true,
        },
      },
    },
  });

  if (!article) {
    throw new HTTPNotFound();
  }

  return {
    ...article,
    blog: replaceFaviconWithCdn(article.blog),
  };
};

const replaceFaviconWithCdn = <T extends { readonly favicon: string | null }>(blog: T): T => {
  return {
    ...blog,
    favicon: blog.favicon ? imageUrlToCdn(blog.favicon) : blog.favicon,
  };
};

const imageUrlToCdn = (url: string) => {
  return Cloudinary.url(url, {
    type: 'fetch',
    secure: true,
    transformation: [{ width: 48, height: 48, crop: 'lpad' }],
    sign_url: true,
  });
};
