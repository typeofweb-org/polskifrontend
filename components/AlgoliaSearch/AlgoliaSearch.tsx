import algoliasearch from 'algoliasearch/lite';
import { memo } from 'react';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
);

type HitProps = {
  readonly hit: {
    readonly blogId: string;
    readonly href: string;
    readonly publishedAt: string;
    readonly slug?: string;
    readonly description?: string;
    readonly title: string;
  };
};

const Hit = memo<HitProps>(({ hit }) => (
  <>
    <h3>{hit.title}</h3>
    <a href={hit.href} target="_blank" rel="noreferrer">
      Przejdź do artykułu
    </a>
  </>
));
Hit.displayName = 'AlogliaHit';

export const AlogliaSearch = () => (
  <InstantSearch
    searchClient={searchClient}
    indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}
  >
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);
