import Clsx from 'clsx';
import Image from 'next/image';
import { memo } from 'react';

import { ArticleTile } from '../ArticleTile/ArticleTile';

import Styles from './blogsGrid.module.scss';

import type { HomePageProps } from '../../pages/[displayStyle]/[page]';

type BlogsGridProps = {
  readonly blogs: NonNullable<HomePageProps['blogs']>;
};

export const BlogsGrid = memo<BlogsGridProps>(({ blogs }) => {
  return (
    <ul className={Styles.blogsGrid}>
      {blogs.map((blog) => (
        <li className={Styles.blog} key={blog.id}>
          <h3 className={Clsx(Styles.gridItem, Styles.blogHeader)}>
            <a href={blog.href} target="_blank" rel="noopener noreferrer">
              {blog.favicon && (
                <Image
                  loading="lazy"
                  src={blog.favicon}
                  alt=""
                  className={Styles.favicon}
                  height={16}
                  width={16}
                />
              )}
              {blog.name}
            </a>
          </h3>
          <ul className={Styles.articles}>
            {blog.articles.map((article) => (
              <li key={article.id} className={Styles.gridItem}>
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
