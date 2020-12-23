import clsx from 'clsx';
import { memo } from 'react';

import type { HomePageProps } from '../../pages/[displayStyle]/[cursor]';
import { ArticleTile } from '../ArticleTile/ArticleTile';

import styles from './blogsGrid.module.scss';

type BlogsGridProps = {
  readonly blogs: NonNullable<HomePageProps['blogs']>;
};

export const BlogsGrid = memo<BlogsGridProps>(({ blogs }) => {
  return (
    <ul className={styles.blogsGrid}>
      {blogs.map((blog) => (
        <li className={styles.blog} key={blog.id}>
          <h3 className={clsx(styles.gridItem, styles.blogHeader)}>
            <a href={blog.href} target="_blank" rel="noreferrer">
              <img
                src={blog.favicon || undefined}
                alt=""
                className={styles.favicon}
                height={26}
                width={26}
              />
              {' ' + blog.name}
            </a>
          </h3>
          <ul className={styles.articles}>
            {blog.articles.map((article) => (
              <li key={article.id} className={styles.gridItem}>
                <ArticleTile article={article} blog={blog} truncate />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
});
BlogsGrid.displayName = 'BlogsGrid';
