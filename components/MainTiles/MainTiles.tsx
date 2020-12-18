import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';

import styles from './mainTiles.module.scss';

export const MainTiles = () => {
  const [displayStyle, setDisplayStyle] = useState<'GRID' | 'LIST'>('GRID');
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Wszystkie artykuły</h2>
      <div className={styles.container}>
        <Link href="/zglos-serwis">
          <a className={styles.button}>
            <span className={clsx('icon-plus', styles.icon)}></span>
            Zgłoś serwis
          </a>
        </Link>
        <div className={styles.wrapper}>
          <button
            className={styles.button}
            onClick={() => setDisplayStyle('GRID')}
            disabled={displayStyle === 'GRID'}
          >
            <span className="icon-th-large"></span>
          </button>
          <button
            className={styles.button}
            onClick={() => setDisplayStyle('LIST')}
            disabled={displayStyle === 'LIST'}
          >
            <span className="icon-menu"></span>
          </button>
        </div>
      </div>
    </section>
  );
};
