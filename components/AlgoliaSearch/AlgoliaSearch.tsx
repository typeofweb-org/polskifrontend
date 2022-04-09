import Algoliasearch from 'algoliasearch/lite';
import { memo, useEffect } from 'react';
import { InstantSearch, PoweredBy, SearchBox } from 'react-instantsearch-dom';

import { getConfig } from '../../api-helpers/config';

import { AlgoliaHits } from './AlgoliaHits';
import Styles from './algoliaSearch.module.scss';

export type SearchState = { readonly query: string };

export type AlgoliaSearchProps = {
  readonly searchState: SearchState;
  readonly setSearchState: (searchState: SearchState) => void;
};

export const AlogliaSearch = memo<AlgoliaSearchProps>(({ searchState, setSearchState }) => {
  const searchClient = Algoliasearch(
    getConfig('NEXT_PUBLIC_ALGOLIA_APP_ID'),
    getConfig('NEXT_PUBLIC_ALGOLIA_API_KEY'),
  );

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
      {showHits && <AlgoliaHits />}
    </InstantSearch>
  );
});
AlogliaSearch.displayName = 'AlogliaSearch';
