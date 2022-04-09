import Dynamic from 'next/dynamic';
import { memo, useState } from 'react';

import { MainTiles } from '../MainTiles/MainTiles';

import Styles from './Main.module.scss';

import type { HomePageProps } from '../../pages/[displayStyle]/[page]';
import type { AlgoliaSearchProps, SearchState } from '../AlgoliaSearch/AlgoliaSearch';

type MainProps = HomePageProps;

const AlgoliaSearch = Dynamic<AlgoliaSearchProps>(
  () =>
    import(
      /* webpackChunkName: "AlgoliaSearch" */
      '../AlgoliaSearch/AlgoliaSearch'
    ).then((mod) => mod.AlgoliaSearch),
  { ssr: false },
);

export const Main = memo<MainProps>((props) => {
  const [searchState, setSearchState] = useState<SearchState>({ query: '' });

  return (
    <section className={Styles.section}>
      <div className={Styles.searchWrapper}>
        <AlgoliaSearch searchState={searchState} setSearchState={setSearchState} />
      </div>
      {!searchState.query && <MainTiles {...props} />}
    </section>
  );
});
Main.displayName = 'Main';
