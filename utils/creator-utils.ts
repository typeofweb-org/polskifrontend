import type { ArticlePageProps } from '../pages/artykuly/[slug]';

// Detect YouTube videos by the article URL
const ytRegex = /youtu(\.be|be\.com)\//g;

// Detect podcasts by the anchor.fm in article URL (most popular hosting) or podcast name (common words like talk or podcast)
const podcastRegex = /(anchor\.fm\/ | talk | podcast)/i;

export const detectContentGenre = (article: ArticlePageProps['article']) => {
  if (article.href.match(ytRegex)) {
    return 'youtube';
  } else if (podcastRegex.exec(article.href) || podcastRegex.exec(article.blog.name)) {
    return 'podcast';
  } else {
    return 'blog';
  }
};
