import { getLastArticlePage, getLastBlogPage } from '../../../../api-helpers/articles';
import { BlogsGrid } from '../../../../components/BlogsGrid/BlogsGrid';
import { BlogsList } from '../../../../components/BlogsList/BlogsList';
import { getPagesArray } from '../../../../utils/array-utils';

import type { DisplayStyle } from '../../../../utils/types/types';

const MAX_PAGES = 5;

export type HomePageProps = {
  readonly params: {
    readonly displayStyle: DisplayStyle;
    readonly page: string;
  };
};

export const revalidate = 900; // 15 minutes

export default function HomePage({ params }: HomePageProps) {
  const { displayStyle, page } = params;

  if (displayStyle !== 'list') {
    // @ts-expect-error Server Component
    return <BlogsGrid page={page} />;
  }

  // @ts-expect-error Server Component
  return <BlogsList page={page} />;
}

export const generateStaticParams = async () => {
  const [gridLastPage, listLastPage] = await Promise.all([
    await getLastBlogPage(),
    await getLastArticlePage(),
  ]);

  const gridPages = getPagesArray(gridLastPage, MAX_PAGES);
  const listPages = getPagesArray(listLastPage, MAX_PAGES);

  const paths = [
    ...gridPages.map((page) => ({ displayStyle: 'grid' as const, page })),
    ...listPages.map((page) => ({ displayStyle: 'list' as const, page })),
  ] satisfies readonly HomePageProps['params'][];

  return paths;
};
