import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useCallback, memo } from 'react';

import type { HomePageProps } from '../../pages/[displayStyle]';
import { Button } from '../Button/Button';
import { DisplayStyleSwitch } from '../DisplayStyleSwitch/DisplayStyleSwitch';

import { BlogsGrid } from './BlogsGrid';
import { BlogsList } from './BlogsList';
import styles from './mainTiles.module.scss';

type MainTilesProps = HomePageProps;

export const MainTiles = memo<MainTilesProps>((props) => {
  const router = useRouter();
  const changeDisplayStyle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return router.push(`/${e.currentTarget.value}`, undefined, { shallow: false });
    },
    [router],
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
        <DisplayStyleSwitch value={props.displayStyle} onChange={changeDisplayStyle} />
      </div>
      {props.displayStyle === 'list' ? (
        <BlogsList articles={props.articles} />
      ) : (
        <BlogsGrid blogs={props.blogs} />
      )}
    </section>
  );
});
MainTiles.displayName = 'MainTiles';
