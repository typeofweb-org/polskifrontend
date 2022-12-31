import Xss from 'xss';

import type { getArticleBySlug } from '../api-helpers/articles';

type ArticleBySlug = Awaited<ReturnType<typeof getArticleBySlug>>;

export function addSanitizedDescriptionToArticle<T extends ArticleBySlug>(article: T) {
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
