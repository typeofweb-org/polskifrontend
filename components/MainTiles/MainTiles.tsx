import Link from 'next/link';
import { useState } from 'react';

import { Button } from '../Button/Button';

import styles from './mainTiles.module.scss';

export const MainTiles = () => {
  const [displayStyle, setDisplayStyle] = useState<'GRID' | 'LIST'>('GRID');
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Wszystkie artykuły</h2>
      <div className={styles.container}>
        <Link href="/zglos-serwis">
          <Button as="a" icon="icon-plus">
            Zgłoś serwis
          </Button>
        </Link>
        <div className={styles.wrapper}>
          <Button
            icon="icon-th-large"
            disabled={displayStyle === 'GRID'}
            onClick={() => setDisplayStyle('GRID')}
          />
          <Button
            icon="icon-menu"
            disabled={displayStyle === 'LIST'}
            onClick={() => setDisplayStyle('LIST')}
          />
        </div>
      </div>
    </section>
  );
};
