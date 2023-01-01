import { fetchArticlesForList } from '../../utils/fetchArticlesForList';
import { ArticleTile } from '../ArticleTile/ArticleTile';
import { Pagination } from '../Pagination/Pagination';

import Styles from './blogsList.module.scss';

type BlogsListProps = {
  readonly page: string;
};

export const BlogsList = async ({ page }: BlogsListProps) => {
  const { articles, ...rest } = await fetchArticlesForList(page);

  return (
    <>
      <ul className={Styles.list}>
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleTile article={article} blog={article.blog} />
          </li>
        ))}
      </ul>

      <Pagination displayStyle="list" {...rest} />
    </>
  );
};
