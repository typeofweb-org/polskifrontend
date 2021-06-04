import { memo } from 'react';

import type { HomePageProps } from '../../pages/[displayStyle]/[page]';
import { ArticleTile } from '../ArticleTile/ArticleTile';

import styles from './blogsList.module.scss';

type BlogsListProps = {
  readonly articles: NonNullable<HomePageProps['articles']>;
};

export const BlogsList = memo<BlogsListProps>(({ articles }) => {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTile article={article} blog={article.blog} />
        </li>
      ))}
    </ul>
  );
});
BlogsList.displayName = 'BlogsList';
