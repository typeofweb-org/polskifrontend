'use client';

import Algoliasearch from 'algoliasearch/lite';
import { memo, useEffect, useState } from 'react';
import { InstantSearch, PoweredBy, SearchBox } from 'react-instantsearch-dom';

import { getConfig } from '../../api-helpers/config';

import { AlgoliaHits } from './AlgoliaHits';
import Styles from './algoliaSearch.module.scss';

import type { ReactNode } from 'react';

// const InstantSearch = Dynamic<InstantSearchProps>(
//   () =>
//     import(
//       /* webpackChunkName: "InstantSearch" */
//       'react-instantsearch-dom'
//     ).then((mod) => mod.InstantSearch),
//   { ssr: false },
// );

export type SearchState = { readonly query: string };

export type AlgoliaSearchProps = {
  readonly children: ReactNode;
};

export const AlgoliaSearch = memo<AlgoliaSearchProps>(({ children }) => {
  const [searchState, setSearchState] = useState<SearchState>({ query: '' });

  const searchClient = Algoliasearch(
    getConfig('NEXT_PUBLIC_ALGOLIA_APP_ID'),
    getConfig('NEXT_PUBLIC_ALGOLIA_API_KEY'),
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) =>
      event.key === 'Escape' && setSearchState({ query: '' });
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchState]);

  return (
    <div className={Styles.searchWrapper}>
      <InstantSearch
        searchState={searchState}
        onSearchStateChange={setSearchState}
        searchClient={searchClient}
        indexName={getConfig('NEXT_PUBLIC_ALGOLIA_INDEX_NAME')}
      >
        <SearchBox
          translations={{
            submitTitle: 'Zatwierdź frazę wyszukiwania.',
            resetTitle: 'Wyczyść frazę wyszukiwania.',
            placeholder: 'Szukaj...',
          }}
        />
        <PoweredBy className={Styles.algoliaPoweredBy} />

        {searchState.query ? <AlgoliaHits /> : <>{children}</>}
      </InstantSearch>
    </div>
  );
});
AlgoliaSearch.displayName = 'AlgoliaSearch';
