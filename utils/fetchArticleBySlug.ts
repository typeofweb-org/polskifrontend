import { notFound } from 'next/navigation';

import { getArticleBySlug } from '../api-helpers/articles';
import { HTTPNotFound } from '../api-helpers/errors';

import { addSanitizedDescriptionToArticle } from './sanitize-utils';

export const fetchArticleBySlug = async (slug: string | undefined) => {
  if (!slug) {
    return notFound();
  }

  try {
    const article = await getArticleBySlug(slug);
    const sanitizedArticle = addSanitizedDescriptionToArticle(article);

    return sanitizedArticle;
  } catch (err) {
    if (err instanceof HTTPNotFound) {
      return notFound();
    }

    throw err;
  }
};
