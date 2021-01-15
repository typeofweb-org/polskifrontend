import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

import { AlgoliaHits } from './AlgoliaHits';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
);

declare module 'react-instantsearch-dom' {
  interface SearchBoxProps {
    readonly onFocus?: (event: React.SyntheticEvent<HTMLInputElement>) => any;
    readonly onBlur?: (event: React.SyntheticEvent<HTMLInputElement>) => any;
  }
}

export const AlogliaSearch = () => {
  const [showHits, setShowHits] = useState(false);

  const handleFocus = () => setShowHits(true);
  const handleBlur = () => setShowHits(false);

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
    >
      <SearchBox onFocus={handleFocus} onBlur={handleBlur} />
      {showHits && <AlgoliaHits />}
    </InstantSearch>
  );
};
