import { fetchArticlesForList } from '../../utils/fetchArticlesForList';
import { ArticleTile } from '../ArticleTile/ArticleTile';
import { Pagination } from '../Pagination/Pagination';

type BlogsListProps = {
  readonly page: string;
};

export const BlogsList = async ({ page }: BlogsListProps) => {
  const { articles, ...rest } = await fetchArticlesForList(page);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles -- unstyled lists should have role="list" attribute */}
      <ul role="list" className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-8">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleTile article={article} blog={article.blog} isInGrid={false} />
          </li>
        ))}
      </ul>

      <Pagination displayStyle="list" {...rest} />
    </>
  );
};
