import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEventHandler } from 'react';
import { useCallback, memo } from 'react';

import { useDidMount } from '../../hooks/useDidMount';
import type { HomePageProps } from '../../pages/[displayStyle]';
import { Button } from '../Button/Button';
import { DisplayStyleSwitch } from '../DisplayStyleSwitch/DisplayStyleSwitch';
import { Section } from '../Section/Section';

import { BlogsGrid } from './BlogsGrid';
import { BlogsList } from './BlogsList';

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
    <Section
      title="Wszystkie artykuły"
      buttons={
        <>
          <Link href="/zglos-serwis" passHref>
            <Button as="a" icon="icon-plus">
              Zgłoś serwis
            </Button>
          </Link>
          <DisplayStyleSwitch value={props.displayStyle} onChange={changeDisplayStyle} />
        </>
      }
    >
      {props.displayStyle === 'list' ? (
        <BlogsList articles={props.articles} />
      ) : (
        <BlogsGrid blogs={props.blogs} />
      )}
    </Section>
  );
});

MainTiles.displayName = 'MainTiles';
