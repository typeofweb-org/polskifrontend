import type { SanitizedArticle } from '../types';

// Detect YouTube videos by the article URL
const ytRegex = /youtu(\.be|be\.com)\//;

// Detect podcasts by the anchor.fm in article URL (most popular hosting) or podcast name (common words like talk or podcast)
const podcastRegex = /(anchor\.fm\/|talk|podcast)/i;

export const detectContentGenre = (article: SanitizedArticle) => {
  if (ytRegex.test(article.href)) {
    return 'youtube' as const;
  } else if (podcastRegex.test(article.href) || podcastRegex.test(article.blog.name)) {
    return 'podcast' as const;
  } else {
    return 'blog' as const;
  }
};
