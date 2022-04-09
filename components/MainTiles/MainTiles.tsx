import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, memo } from 'react';

import { useDidMount } from '../../hooks/useDidMount';
import { displayPreferences, useDisplayPreferences } from '../../hooks/useDisplayPreferences';
import { includes } from '../../utils/array-utils';
import { Button } from '../Button/Button';
import { DisplayStyleSwitch } from '../DisplayStyleSwitch/DisplayStyleSwitch';

import { BlogsGrid } from './BlogsGrid';
import { BlogsList } from './BlogsList';
import Styles from './mainTiles.module.scss';

import type { HomePageProps } from '../../pages/[displayStyle]/[page]';
import type { ChangeEventHandler } from 'react';

type MainTilesProps = HomePageProps;

export const MainTiles = memo<MainTilesProps>((props) => {
  const router = useRouter();
  const [changeDisplay] = useDisplayPreferences();

  const changeDisplayStyle = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ currentTarget }) => {
      if (includes(displayPreferences, currentTarget.value)) {
        changeDisplay(currentTarget.value);
      }
    },
    [changeDisplay],
  );
  const nextPage = Number(props.pageNumber) - 1;
  const previousPage = Number(props.pageNumber) + 1;
  const isFirstPage = Number(props.pageNumber) === 1;

  useDidMount(() => {
    void router.prefetch(`/grid`);
    void router.prefetch(`/list`);
  });

  return (
    <>
      <h2 className={Styles.heading}>Wszystkie artykuły</h2>
      <div className={Styles.buttons}>
        <Link href="/zglos-serwis" passHref>
          <Button as="a" icon="icon-plus">
            Dodaj serwis
          </Button>
        </Link>
        <DisplayStyleSwitch value={props.displayStyle} onChange={changeDisplayStyle} />
      </div>
      {props.displayStyle === 'list' ? (
        <BlogsList articles={props.articles} />
      ) : (
        <BlogsGrid blogs={props.blogs} />
      )}
      <div className={Styles.pagination}>
        {!props.isLastPage && (
          <>
            <Link passHref href={`/${props.displayStyle}/${previousPage}`}>
              <Button
                className={Styles.nextPageButton}
                as="a"
                iconPosition="left"
                icon="icon-arrow-left2"
              >
                Poprzednia strona
              </Button>
            </Link>
            <Link passHref href={`/${props.displayStyle}`}>
              <Button className={Styles.nextPageButton} as="a">
                Najnowsze
              </Button>
            </Link>
          </>
        )}
        {!isFirstPage && (
          <Link passHref href={`/${props.displayStyle}/${nextPage}`}>
            <Button
              className={Styles.nextPageButton}
              as="a"
              iconPosition="right"
              icon="icon-arrow-right2"
            >
              Następna strona
            </Button>
          </Link>
        )}
      </div>
    </>
  );
});

MainTiles.displayName = 'MainTiles';
