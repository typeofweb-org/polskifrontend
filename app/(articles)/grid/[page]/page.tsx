import { getLastBlogPage } from '../../../../api-helpers/articles';
import { closeConnection, openConnection } from '../../../../api-helpers/prisma/db';
import { BlogsGrid } from '../../../../components/BlogsGrid/BlogsGrid';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { MAX_PAGES } from '../../../../constants';
import { getPagesArray } from '../../../../utils/array-utils';
import { fetchArticlesForGrid } from '../../../../utils/fetchArtilesForGrid';

type GridPageProps = {
  readonly params: {
    readonly page: string;
  };
};

export default async function GridPage({ params }: GridPageProps) {
  const { blogs, ...rest } = await fetchArticlesForGrid(params.page);

  return (
    <>
      <BlogsGrid blogs={blogs} />
      <Pagination displayStyle="grid" {...rest} />
    </>
  );
}

export const generateStaticParams = async () => {
  try {
    const prisma = openConnection();

    const gridLastPage = await getLastBlogPage(prisma);
    const gridPages = getPagesArray(gridLastPage, MAX_PAGES);
    const paths = gridPages.map((page) => ({ page }));

    return paths;
  } finally {
    await closeConnection();
  }
};
