import { memo } from 'react';

import { ArticleTile } from '../ArticleTile/ArticleTile';

import Styles from './blogsList.module.scss';

import type { HomePageProps } from '../../pages/[displayStyle]/[page]';

type BlogsListProps = {
  readonly articles: NonNullable<HomePageProps['articles']>;
};

export const BlogsList = memo<BlogsListProps>(({ articles }) => {
  return (
    <ul className={Styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTile article={article} blog={article.blog} />
        </li>
      ))}
    </ul>
  );
});
BlogsList.displayName = 'BlogsList';
