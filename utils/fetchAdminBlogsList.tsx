import Link from 'next/link';

import { prisma } from '../api-helpers/prisma/db';

import { formatDate } from './date-utils';

import type { BlogsType } from './types/types';

export const fetchAdminBlogsList = async (blogsType: BlogsType | undefined) => {
  const blogs = await prisma.blog.findMany({
    where: {
      isPublic: detectBlogsType(blogsType),
    },
    orderBy: {
      id: 'desc',
    },
  });

  const data = blogs.map((blog) => ({
    ...blog,
    isPublic: blog.isPublic ? '✅' : '❌',
    lastArticlePublishedAt: blog.lastArticlePublishedAt
      ? formatDate(blog.lastArticlePublishedAt)
      : '',
    createdAt: formatDate(blog.createdAt),
    link: (
      <Link href={blog.href} target="_blank" rel="noopener noreferrer">
        Link
      </Link>
    ),
    edit: <Link href={`/admin/blogs/${blog.id}`}>Edytuj</Link>,
  }));

  return data;
};

const detectBlogsType = (blogsType: BlogsType | undefined) => {
  switch (blogsType) {
    case 'public':
      return true;

    case 'nonpublic':
      return false;

    default:
      return undefined;
  }
};
