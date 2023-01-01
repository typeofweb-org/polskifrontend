import Link from 'next/link';

import { closeConnection, openConnection } from '../api-helpers/prisma/db';

import { formatDate } from './date-utils';

import type { TypeOfBlogs } from '../types';

export const fetchAdminBlogsList = async (typeOfBlogs: TypeOfBlogs) => {
  try {
    const prisma = openConnection();

    const blogs = await prisma.blog.findMany({
      where: {
        isPublic: detectTypeOfBlogs(typeOfBlogs),
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
  } finally {
    await closeConnection();
  }
};

const detectTypeOfBlogs = (typeOfBlogs: TypeOfBlogs) => {
  switch (typeOfBlogs) {
    case 'public':
      return true;

    case 'nonpublic':
      return false;

    default:
      return undefined;
  }
};
