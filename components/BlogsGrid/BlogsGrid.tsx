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
            <h3
              className={Clsx(
                Styles.gridItem,
                'mt-4 border-b-2 border-gray-light pb-2 text-center text-xl',
              )}
            >
              <Link href={blog.href} target="_blank" rel="noopener noreferrer">
                {blog.favicon && (
                  <Image src={blog.favicon} alt="" className="mr-2" height={16} width={16} />
                )}
                {blog.name}
              </Link>
            </h3>
            <ul className="contents list-none">
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
