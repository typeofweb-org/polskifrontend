import { notFound } from 'next/navigation';

import { getArticlesForList, getLastArticlePage } from '../api-helpers/articles';
import { HTTPNotFound } from '../api-helpers/errors';

import { addExcerptToArticle } from './excerpt-utils';
import { pageValidGuard } from './pageValidGuard';

export const fetchArticlesForList = async (page?: string) => {
  try {
    const lastPage = await getLastArticlePage();
    const pageNumber = pageValidGuard(page, lastPage);
    const { data: articlesFromDb } = await getArticlesForList(pageNumber);
    const articles = articlesFromDb.map(addExcerptToArticle);

    return {
      articles,
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
