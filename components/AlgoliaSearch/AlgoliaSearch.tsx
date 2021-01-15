import algoliasearch from 'algoliasearch/lite';
import { useRef, useState } from 'react';
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
  const [canShowHits, setCanShowHits] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const handleShowHits = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setCanShowHits(true);
  };
  const handleHideHits = () => {
    timeoutId.current = setTimeout(() => {
      setCanShowHits(false);
    }, 1000);
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
    >
      <SearchBox onFocus={handleShowHits} onBlur={handleHideHits} />
      {canShowHits && <AlgoliaHits />}
    </InstantSearch>
  );
};
