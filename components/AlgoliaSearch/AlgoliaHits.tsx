import { connectHits } from 'react-instantsearch-dom';

import { AlgoliaHit } from './AlgoliaHit';

import type { Hit } from './AlgoliaHit';

type HitsProps = {
  readonly hits: readonly Hit[];
};

const Hits = ({ hits }: HitsProps) => (
  <ol className="w-full list-none p-0">
    {hits.map((hit) => (
      <li className="my-4 w-full hover:bg-[#f2f2f2]" key={hit.objectID}>
        <AlgoliaHit hit={hit} />
      </li>
    ))}
  </ol>
);

export const AlgoliaHits = connectHits(Hits);
