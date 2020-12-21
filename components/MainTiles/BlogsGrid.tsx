import { memo } from 'react';

import type { HomePageProps } from '../../pages/[displayStyle]/[page]';
import { ArticleTile } from '../ArticleTile/ArticleTile';

type BlogsGridProps = {
  readonly blogs: NonNullable<HomePageProps['blogs']>;
};

export const BlogsGrid = memo<BlogsGridProps>(({ blogs }) => {
  return (
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
  );
});
BlogsGrid.displayName = 'BlogsGrid';
