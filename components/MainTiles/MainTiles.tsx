import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import { Button } from '../Button/Button';
import { DisplayStyleSwitch } from '../DisplayStyleSwitch/DisplayStyleSwitch';

import styles from './mainTiles.module.scss';

export const MainTiles = () => {
  const [displayStyle, setDisplayStyle] = useState<'GRID' | 'LIST'>('GRID');
  const changeDisplayStyle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDisplayStyle(e.target.value as 'GRID' | 'LIST'),
    [],
  );
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Wszystkie artykuły</h2>
      <div className={styles.container}>
        <Link href="/zglos-serwis" passHref>
          <Button as="a" icon="icon-plus">
            Zgłoś serwis
          </Button>
        </Link>
        <DisplayStyleSwitch value={displayStyle} onChange={changeDisplayStyle} />
      </div>
    </section>
  );
};
