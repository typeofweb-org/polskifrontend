import { memo } from 'react';

import type { HomePageProps } from '../../pages/[displayStyle]';
import { ArticleTile } from '../ArticleTile/ArticleTile';

type BlogsListProps = {
  readonly articles: NonNullable<HomePageProps['articles']>;
};

export const BlogsList = memo<BlogsListProps>(({ articles }) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTile article={article} blog={article.blog} />
        </li>
      ))}
    </ul>
  );
});
BlogsList.displayName = 'BlogsList';
