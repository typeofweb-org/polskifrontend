import { BlogsList } from '../../../components/BlogsList/BlogsList';
import { Pagination } from '../../../components/Pagination/Pagination';
import { fetchArticlesForList } from '../../../utils/fetchArticlesForList';

export default async function IndexListPage() {
  const { articles, ...rest } = await fetchArticlesForList();

  return (
    <>
      <BlogsList articles={articles} />
      <Pagination displayStyle="list" {...rest} />
    </>
  );
}
