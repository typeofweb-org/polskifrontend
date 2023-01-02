import { getLastArticlePage, getLastBlogPage } from '../../../../api-helpers/articles';
import { closeConnection, openConnection } from '../../../../api-helpers/prisma/db';
import { BlogsGrid } from '../../../../components/BlogsGrid/BlogsGrid';
import { BlogsList } from '../../../../components/BlogsList/BlogsList';
import { ButtonAsLink } from '../../../../components/ButtonAsLink/ButtonAsLink';
import { DisplayStyleSwitch } from '../../../../components/DisplayStyleSwitch/DisplayStyleSwitch';
import { MAX_PAGES } from '../../../../constants';
import { getPagesArray } from '../../../../utils/array-utils';

import Styles from './page.module.scss';

import type { DisplayStyle } from '../../../../types';

type HomePageProps = {
  readonly params: {
    readonly displayStyle: DisplayStyle;
    readonly page: string;
  };
};

export default function HomePage({ params }: HomePageProps) {
  const { displayStyle, page } = params;

  return (
    <>
      <h2 className={Styles.heading}>Wszystkie artykuły</h2>

      <div className={Styles.buttons}>
        <ButtonAsLink href="/zglos-serwis" icon="icon-plus">
          Dodaj serwis
        </ButtonAsLink>

        <DisplayStyleSwitch value={displayStyle} />
      </div>
      {/* @ts-expect-error Async Server Component */}
      {displayStyle === 'grid' ? <BlogsGrid page={page} /> : <BlogsList page={page} />}
    </>
  );
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
