import Clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { ArticleTile } from '../ArticleTile/ArticleTile';

import Styles from './blogsGrid.module.scss';

import type { Blog } from '../../types';

type BlogsGridProps = {
  readonly blogs: readonly Blog[];
};

export const BlogsGrid = memo<BlogsGridProps>(({ blogs }) => {
  return (
    <ul className={Styles.blogsGrid}>
      {blogs.map((blog) => (
        <li className={Styles.blog} key={blog.id}>
          <h3 className={Clsx(Styles.gridItem, Styles.blogHeader)}>
            <Link href={blog.href} target="_blank" rel="noopener noreferrer">
              {blog.favicon && (
                <Image
                  src={blog.favicon}
                  alt=""
                  className={Styles.favicon}
                  height={16}
                  width={16}
                />
              )}
              {blog.name}
            </Link>
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