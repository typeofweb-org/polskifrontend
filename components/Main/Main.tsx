import dynamic from 'next/dynamic';
import { memo, useState } from 'react';

import type { HomePageProps } from '../../pages/[displayStyle]/[cursor]';
import type { AlgoliaSearchProps, SearchState } from '../AlgoliaSearch/AlgoliaSearch';
import { MainTiles } from '../MainTiles/MainTiles';

import styles from './Main.module.scss';

type MainProps = HomePageProps;

const AlogliaSearch = dynamic<AlgoliaSearchProps>(
  () =>
    import(
      /* webpackChunkName: "AlgoliaSearch" */
      '../AlgoliaSearch/AlgoliaSearch'
    ).then((mod) => mod.AlogliaSearch),
  { ssr: false },
);

export const Main = memo<MainProps>((props) => {
  const [searchState, setSearchState] = useState<SearchState>({ query: '' });

  return (
    <section className={styles.section}>
      <div className={styles.searchWrapper}>
        <AlogliaSearch searchState={searchState} setSearchState={setSearchState} />
      </div>
      {!searchState.query && <MainTiles {...props} />}
    </section>
  );
});
Main.displayName = 'Main';
