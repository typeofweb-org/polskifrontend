import { getLastArticlePage, getLastBlogPage } from '../../../../api-helpers/articles';
import { closeConnection, openConnection } from '../../../../api-helpers/prisma/db';
import { BlogsGrid } from '../../../../components/BlogsGrid/BlogsGrid';
import { BlogsList } from '../../../../components/BlogsList/BlogsList';
import { getPagesArray } from '../../../../utils/array-utils';

import type { DisplayStyle } from '../../../../types';

const MAX_PAGES = 5;

type HomePageProps = {
  readonly params: {
    readonly displayStyle: DisplayStyle;
    readonly page: string;
  };
};

export const revalidate = 900; // 15 minutes

export default function HomePage({ params }: HomePageProps) {
  const { displayStyle, page } = params;

  if (displayStyle === 'grid') {
    // @ts-expect-error Server Component
    return <BlogsGrid page={page} />;
  }

  // @ts-expect-error Server Component
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
      ...gridPages.map((page) => ({ displayStyle: 'grid', page })),
      ...listPages.map((page) => ({ displayStyle: 'list', page })),
    ];

    return paths;
  } finally {
    await closeConnection();
  }
};
