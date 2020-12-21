import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEventHandler } from 'react';
import { useCallback, memo } from 'react';

import { useDidMount } from '../../hooks/useDidMount';
import type { HomePageProps } from '../../pages/[displayStyle]/[page]';
import { Button } from '../Button/Button';
import { DisplayStyleSwitch } from '../DisplayStyleSwitch/DisplayStyleSwitch';

import { BlogsGrid } from './BlogsGrid';
import { BlogsList } from './BlogsList';
import styles from './mainTiles.module.scss';

type MainTilesProps = HomePageProps;

export const MainTiles = memo<MainTilesProps>((props) => {
  const router = useRouter();
  const changeDisplayStyle = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      return router.replace(`/${e.currentTarget.value}`, undefined, { shallow: false });
    },
    [router],
  );

  useDidMount(() => {
    void router.prefetch(`/grid`);
    void router.prefetch(`/list`);
  });

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
      {props.nextId && (
        <Link passHref href={`/${props.displayStyle}/${props.nextId}`}>
          <Button className={styles.nextPageButton} as="a">
            Następna strona
          </Button>
        </Link>
      )}
    </section>
  );
});
MainTiles.displayName = 'MainTiles';
