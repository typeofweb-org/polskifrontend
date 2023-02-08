import { notFound } from 'next/navigation';

import { getArticlesForGrid, getLastBlogPage } from '../api-helpers/articles';
import { HTTPNotFound } from '../api-helpers/errors';

import { addExcerptToArticle } from './excerpt-utils';
import { pageValidGuard } from './pageValidGuard';

export const fetchBlogsForGrid = async (page?: string) => {
  try {
    const lastPage = await getLastBlogPage();
    const pageNumber = pageValidGuard(page, lastPage);
    const { data: blogsFromDb } = await getArticlesForGrid(pageNumber);

    const blogs = blogsFromDb.map((blog) => {
      return {
        ...blog,
        articles: blog.articles.map(addExcerptToArticle),
      };
    });

    return {
      blogs,
      isLastPage: pageNumber === lastPage,
      nextPage: Number(pageNumber) - 1,
      previousPage: Number(pageNumber) + 1,
      isFirstPage: Number(pageNumber) === 1,
    };
  } catch (err) {
    if (err instanceof HTTPNotFound) {
      return notFound();
    }

    throw err;
  }
};
