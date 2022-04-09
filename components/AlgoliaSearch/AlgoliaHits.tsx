import { connectHits } from 'react-instantsearch-dom';

import { AlgoliaHit } from './AlgoliaHit';
import Styles from './AlgoliaHits.module.css';

import type { Hit } from './AlgoliaHit';

type HitsProps = {
  readonly hits: readonly Hit[];
};

const Hits = ({ hits }: HitsProps) => (
  <ol className={Styles.list}>
    {hits.map((hit) => (
      <li className={Styles.listItem} key={hit.objectID}>
        <AlgoliaHit hit={hit} />
      </li>
    ))}
  </ol>
);

export const AlgoliaHits = connectHits(Hits);
