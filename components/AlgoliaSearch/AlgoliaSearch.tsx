import algoliasearch from 'algoliasearch/lite';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const container = useRef<HTMLDivElement | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const showHits = useCallback(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setCanShowHits(true);
  }, []);
  const hideHits = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      setCanShowHits(false);
    }, 0);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) =>
      event.target === container.current ||
      container.current?.contains(event.target as Node) ||
      hideHits();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [hideHits]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && hideHits();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hideHits]);

  return (
    <div ref={container}>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
      >
        <SearchBox onFocus={showHits} onBlur={hideHits} />
        {canShowHits && <AlgoliaHits />}
      </InstantSearch>
    </div>
  );
};
