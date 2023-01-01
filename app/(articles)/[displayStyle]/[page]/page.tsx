import { getLastArticlePage, getLastBlogPage } from '../../../../api-helpers/articles';
import { closeConnection, openConnection } from '../../../../api-helpers/prisma/db';
import { BlogsGrid } from '../../../../components/BlogsGrid/BlogsGrid';
import { BlogsList } from '../../../../components/BlogsList/BlogsList';
import { MAX_PAGES } from '../../../../constants';
import { getPagesArray } from '../../../../utils/array-utils';

import type { DisplayStyle } from '../../../../types';

type HomePageProps = {
  readonly params: {
    readonly displayStyle: DisplayStyle;
    readonly page: string;
  };
};

export default function HomePage({ params }: HomePageProps) {
  const { displayStyle, page } = params;

  if (displayStyle === 'grid') {
    // @ts-expect-error Async Server Component
    return <BlogsGrid page={page} />;
  }

  // @ts-expect-error Async Server Component
  return <BlogsList page={page} />;
}

export const generateStaticParams = async () => {
  try {
    const prisma = openConnection();

    const [gridLastPage, listLastPage] = await Promise.all([
      await getLastBlogPage(prisma),
      await getLastArticlePage(prisma),
    ]);

    const gridPages = getPagesArray(gridLastPage, MAX_PAGES);
    const listPages = getPagesArray(listLastPage, MAX_PAGES);

    const paths = [
      ...gridPages.map((page) => ({ displayStyle: 'grid' as const, page })),
      ...listPages.map((page) => ({ displayStyle: 'list' as const, page })),
    ];

    return paths;
  } finally {
    await closeConnection();
  }
};
