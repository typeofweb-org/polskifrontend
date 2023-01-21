'use client';

import { memo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import { getConfig } from '../../api-helpers/config';

import type { ReactNode } from 'react';

import { AlgoliaHits } from './AlgoliaHits';
import { SearchBox } from './SearchBox';
import { useAlgolia } from './useAlgolia';


export type AlgoliaSearchProps = {
  readonly children: ReactNode;
};

export const AlgoliaSearch = memo<AlgoliaSearchProps>(({ children }) => {
  const { searchClient, searchState, onSearchStateChange, changeSearchState, clearSearchState } =
    useAlgolia();

  return (
    <InstantSearch
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      searchClient={searchClient}
      indexName={getConfig('NEXT_PUBLIC_ALGOLIA_INDEX_NAME')}
    >
      <SearchBox
        query={searchState.query}
        changeSearchState={changeSearchState}
        clearSearchState={clearSearchState}
      />
      {searchState.query?.length > 0 ? <AlgoliaHits /> : <>{children}</>}
    </InstantSearch>
  );
});

AlgoliaSearch.displayName = 'AlgoliaSearch';
