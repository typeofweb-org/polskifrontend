import { ArticleTile } from '../ArticleTile/ArticleTile';

import Styles from './blogsList.module.scss';

import type { Article } from '../../types';

type BlogsListProps = {
  readonly articles: readonly Article[];
};

export const BlogsList = ({ articles }: BlogsListProps) => {
  return (
    <ul className={Styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTile article={article} blog={article.blog} />
        </li>
      ))}
    </ul>
  );
};

BlogsList.displayName = 'BlogsList';
