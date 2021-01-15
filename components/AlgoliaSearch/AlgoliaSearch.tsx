import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';

import { AlgoliaHits } from './AlgoliaHits';
import { AlgoliaSearchBox } from './AlogliaSearchBox';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
);

export const AlogliaSearch = () => {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
    >
      <AlgoliaSearchBox />
      <AlgoliaHits />
    </InstantSearch>
  );
};
