import { BlogsGrid } from '../../../components/BlogsGrid/BlogsGrid';
import { Pagination } from '../../../components/Pagination/Pagination';
import { fetchArticlesForGrid } from '../../../utils/fetchArtilesForGrid';

export default async function IndexGridPage() {
  const { blogs, ...rest } = await fetchArticlesForGrid();

  return (
    <>
      <BlogsGrid blogs={blogs} />
      <Pagination displayStyle="grid" {...rest} />
    </>
  );
}
