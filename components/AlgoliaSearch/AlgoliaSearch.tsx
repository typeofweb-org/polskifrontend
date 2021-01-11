import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID as string,
  process.env.ALGOLIA_API_SECRET as string,
);

export const AlogliaSearch = () => (
  <div style={{ padding: '1rem', marginTop: '3rem' }}>
    <InstantSearch searchClient={searchClient} indexName={process.env.ALGOLIA_INDEX_NAME as string}>
      <SearchBox />
      <Hits />
    </InstantSearch>
  </div>
);
