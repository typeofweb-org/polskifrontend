import { notFound } from 'next/navigation';

import { getArticleBySlug } from '../api-helpers/articles';
import { HTTPNotFound } from '../api-helpers/errors';
import { closeConnection, openConnection } from '../api-helpers/prisma/db';

import { addSanitizedDescriptionToArticle } from './sanitize-utils';

export const fetchArticleBySlug = async (slug: string | undefined) => {
  if (!slug) {
    return notFound();
  }

  try {
    const prisma = openConnection();

    const article = await getArticleBySlug(prisma, slug);
    const sanitizedArticle = addSanitizedDescriptionToArticle(article);

    return sanitizedArticle;
  } catch (err) {
    if (err instanceof HTTPNotFound) {
      return notFound();
    }

    throw err;
  } finally {
    await closeConnection();
  }
};
