import Link from 'next/link';

import { fetchBlogsForGrid } from '../../utils/fetchBlogsForGrid';
import { ArticleTile } from '../ArticleTile/ArticleTile';
import { Pagination } from '../Pagination/Pagination';

type BlogsGridProps = {
  readonly page: string;
};

export const BlogsGrid = async ({ page }: BlogsGridProps) => {
  const { blogs, ...rest } = await fetchBlogsForGrid(page);

  return (
    <>
      <ul
        role="list"
        className="flex w-full flex-col flex-wrap items-start justify-center md:p-3 lg:flex-row lg:p-6"
      >
        {blogs.map((blog) => (
          <li className="flex w-full flex-col justify-center gap-6 lg:w-1/2 lg:p-3" key={blog.id}>
            <h3 className="mt-4 border-b-2 border-gray-light pb-2 text-center text-xl">
              <Link href={blog.href} target="_blank" rel="noopener noreferrer">
                {blog.name}
              </Link>
            </h3>

            <ul role="list" className="flex flex-col gap-4">
              {blog.articles.map((article) => (
                <li key={article.id}>
                  <ArticleTile article={article} blog={blog} truncate isInGrid={true} />
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
