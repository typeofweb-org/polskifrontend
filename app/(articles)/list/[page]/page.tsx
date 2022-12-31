import { getLastArticlePage } from '../../../../api-helpers/articles';
import { closeConnection, openConnection } from '../../../../api-helpers/prisma/db';
import { BlogsList } from '../../../../components/BlogsList/BlogsList';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { MAX_PAGES } from '../../../../constants';
import { getPagesArray } from '../../../../utils/array-utils';
import { fetchArticlesForList } from '../../../../utils/fetchArticlesForList';

type ListPageProps = {
  readonly params: {
    readonly page: string;
  };
};

export default async function ListPage({ params }: ListPageProps) {
  const { articles, ...rest } = await fetchArticlesForList(params.page);

  return (
    <>
      <BlogsList articles={articles} />
      <Pagination displayStyle="list" {...rest} />
    </>
  );
}

export const generateStaticParams = async () => {
  try {
    const prisma = openConnection();

    const listLastPage = await getLastArticlePage(prisma);
    const listPages = getPagesArray(listLastPage, MAX_PAGES);
    const paths = listPages.map((page) => ({ page }));

    return paths;
  } finally {
    await closeConnection();
  }
};
