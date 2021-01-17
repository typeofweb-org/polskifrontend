import algoliasearch from 'algoliasearch/lite';
import { memo, useEffect } from 'react';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

import { AlgoliaHits } from './AlgoliaHits';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
);

export type SearchState = { readonly query: string };

export type AlgoliaSearchProps = {
  readonly searchState: SearchState;
  readonly setSearchState: (searchState: SearchState) => void;
};

export const AlogliaSearch = memo<AlgoliaSearchProps>(({ searchState, setSearchState }) => {
  const showHits = searchState.query !== '';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) =>
      event.key === 'Escape' && setSearchState({ query: '' });
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchState]);

  return (
    <InstantSearch
      searchState={searchState}
      onSearchStateChange={setSearchState}
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
    >
      <SearchBox />
      {showHits && <AlgoliaHits />}
    </InstantSearch>
  );
});
AlogliaSearch.displayName = 'AlogliaSearch';
