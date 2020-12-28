import type { Article } from '@prisma/client';
import Xss from 'xss';

export function addSanitizedDescriptionToArticle<T extends Article>(article: T) {
  return {
    ...article,
    sanitizedDescription: Xss(article.description || '', {
      stripIgnoreTag: true,
      whiteList: {
        a: ['href', 'target'],
        p: [],
      },
    }),
  };
}
