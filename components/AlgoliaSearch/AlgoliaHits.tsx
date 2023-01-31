import { connectHits } from 'react-instantsearch-dom';

import { AlgoliaHit } from './AlgoliaHit';

import type { Hit } from './AlgoliaHit';

type HitsProps = {
  readonly hits: readonly Hit[];
};

const Hits = ({ hits }: HitsProps) => (
  <ol className="w-full" role="list">
    {hits.map((hit) => (
      <li className="my-4 w-full hover:bg-theme-secondary" key={hit.objectID}>
        <AlgoliaHit hit={hit} />
      </li>
    ))}
  </ol>
);

export const AlgoliaHits = connectHits(Hits);
