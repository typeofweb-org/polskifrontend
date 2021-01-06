import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useQuery } from '../../hooks/useQuery';
import { getBlogs } from '../../utils/api/getBlogs';
import { formatDate } from '../../utils/date-utils';
import { addTrackingToLink } from '../../utils/link-utils';
import { BlogsTable } from '../BlogsTable/BlogsTable';

import styles from './adminPanel.module.scss';

export const AdminPanel = () => {
  const router = useRouter();
  const publicQuery = window?.location.search || '';

  const { value: blogs } = useQuery(useCallback(() => getBlogs(publicQuery), [publicQuery]));

  if (!blogs) {
    return <p>Ładowanie...</p>;
  }

  const tableData = blogs.map((blog) => ({
    ...blog,
    isPublic: blog.isPublic ? '✅' : '❌',
    lastArticlePublishedAt: formatDate(blog.lastArticlePublishedAt || new Date()),
    createdAt: formatDate(blog.createdAt || new Date()),
    link: (
      <Link href={addTrackingToLink(blog.href, { utm_medium: 'homepage' })}>
        <a target="_blank" rel="noopener noreferrer">
          Link
        </a>
      </Link>
    ),
    edit: (
      <Link href={`/admin/blogs/${blog.id}`}>
        <a>Edytuj</a>
      </Link>
    ),
  }));

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Admin Panel - Blogi</h2>
      <div className={styles.tableWrapper}>
        <label className={styles.publicSelectLabel}>
          Pokazuj blogi: {/* eslint-disable jsx-a11y/no-onchange */}
          <select
            onChange={(e) => {
              const val = e.currentTarget.value;

              void router.push(
                { pathname: '/admin', query: val === '' ? null : { isPublic: val } },
                undefined,
                {
                  shallow: true,
                },
              );
            }}
          >
            <option value="" defaultChecked>
              Wszystkie
            </option>
            <option value="true">Tylko widoczne</option>
            <option value="false">Tylko ukryte</option>
          </select>
        </label>
        <BlogsTable
          columns={[
            ['link', 'Link do bloga'],
            ['name', 'Nazwa bloga'],
            ['isPublic', 'Widoczny'],
            ['creatorEmail', 'E-mail autora'],
            ['lastArticlePublishedAt', 'Ostatnia publikacja'],
            ['createdAt', 'Data zgłoszenia'],
            ['edit', 'Edytuj dane bloga'],
          ]}
          data={tableData}
        />
      </div>
    </section>
  );
};
