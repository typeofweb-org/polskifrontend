import { connectHits } from 'react-instantsearch-dom';

import type { Hit } from './AlgoliaHit';
import { AlgoliaHit } from './AlgoliaHit';
import styles from './AlgoliaHits.module.css';

type HitsProps = {
  readonly hits: readonly Hit[];
};

const Hits = ({ hits }: HitsProps) => (
  <ol className={styles.list}>
    {hits.map((hit) => (
      <li className={styles.listItem} key={hit.objectID}>
        <AlgoliaHit hit={hit} />
      </li>
    ))}
  </ol>
);

export const AlgoliaHits = connectHits(Hits);
