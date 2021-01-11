import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
);

export const AlogliaSearch = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
  >
    <SearchBox />
    <Hits />
  </InstantSearch>
);
