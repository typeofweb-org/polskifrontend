import Clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { fetchBlogsForGrid } from '../../utils/fetchBlogsForGrid';
import { ArticleTile } from '../ArticleTile/ArticleTile';
import { Pagination } from '../Pagination/Pagination';

import Styles from './blogsGrid.module.scss';

type BlogsGridProps = {
  readonly page: string;
};

export const BlogsGrid = async ({ page }: BlogsGridProps) => {
  const { blogs, ...rest } = await fetchBlogsForGrid(page);

  return (
    <>
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

      <Pagination displayStyle="grid" {...rest} />
    </>
  );
};
