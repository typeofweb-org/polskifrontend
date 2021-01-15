import { connectHits } from 'react-instantsearch-dom';

import type { Hit } from './AlgoliaHit';
import { AlgoliaHit } from './AlgoliaHit';

type HitsProps = {
  readonly hits: readonly Hit[];
};

const Hits = ({ hits }: HitsProps) => (
  <ol>
    {hits.map((hit) => (
      <li key={hit.objectID}>
        <AlgoliaHit hit={hit} />
      </li>
    ))}
  </ol>
);

export const AlgoliaHits = connectHits(Hits);
