import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useCallback, useState, memo } from 'react';

import type { HomePageProps } from '../../pages';
import { ArticleTile } from '..//ArticleTile/ArticleTile';
import { Button } from '../Button/Button';
import { DisplayStyleSwitch } from '../DisplayStyleSwitch/DisplayStyleSwitch';

import styles from './mainTiles.module.scss';

type MainTilesProps = HomePageProps;

export const MainTiles = memo<MainTilesProps>(({ blogs }) => {
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
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.name}
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {blog.articles.map((article) => (
                <li key={article.id}>
                  <ArticleTile article={article} blog={blog} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
});
MainTiles.displayName = 'MainTiles';
