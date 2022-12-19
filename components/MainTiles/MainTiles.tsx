import { useRouter } from 'next/router';
import { useCallback, memo } from 'react';

import { useDidMount } from '../../hooks/useDidMount';
import { displayPreferences, useDisplayPreferences } from '../../hooks/useDisplayPreferences';
import { includes } from '../../utils/array-utils';
import { ButtonAsLink } from '../ButtonAsLink/ButtonAsLink';
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
        <ButtonAsLink href="/zglos-serwis" icon="icon-plus">
          Dodaj serwis
        </ButtonAsLink>
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
            <ButtonAsLink
              href={`/${props.displayStyle}/${previousPage}`}
              iconPosition="left"
              icon="icon-arrow-left2"
              className={Styles.nextPageButton}
            >
              Poprzednia strona
            </ButtonAsLink>
            <ButtonAsLink href={`/${props.displayStyle}`} className={Styles.nextPageButton}>
              Najnowsze
            </ButtonAsLink>
          </>
        )}
        {!isFirstPage && (
          <ButtonAsLink
            href={`/${props.displayStyle}/${nextPage}`}
            iconPosition="right"
            icon="icon-arrow-right2"
            className={Styles.nextPageButton}
          >
            Następna strona
          </ButtonAsLink>
        )}
      </div>
    </>
  );
});

MainTiles.displayName = 'MainTiles';
