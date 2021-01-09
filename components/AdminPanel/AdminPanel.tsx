import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';
import { object } from 'yup';

import { useQuery } from '../../hooks/useQuery';
import { useSmartQuery } from '../../hooks/useSmartQuery';
import { getBlogs } from '../../utils/api/getBlogs';
import { formatDate } from '../../utils/date-utils';
import { oneOfValues } from '../../utils/schema-utils';
import { Table } from '../Table/Table';

import styles from './adminPanel.module.scss';

const columns = [
  ['link', 'Link do bloga'],
  ['name', 'Nazwa bloga'],
  ['isPublic', 'Widoczny'],
  ['creatorEmail', 'E-mail autora'],
  ['lastArticlePublishedAt', 'Ostatnia publikacja'],
  ['createdAt', 'Data zgłoszenia'],
  ['edit', 'Edytuj dane bloga'],
] as const;

export const AdminPanel = () => {
  const {
    query: { isPublic },
    changeQuery,
  } = useSmartQuery(object({ isPublic: oneOfValues(['true', 'false', ''] as const) }));

  const { value: blogs } = useQuery(useCallback(() => getBlogs(isPublic || undefined), [isPublic]));

  const handlePublicChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const val = e.currentTarget.value as typeof isPublic;

      void changeQuery({ isPublic: val });
    },
    [changeQuery],
  );

  if (!blogs) {
    return <p>Ładowanie...</p>;
  }

  const tableData = blogs.map((blog) => ({
    ...blog,
    isPublic: blog.isPublic ? '✅' : '❌',
    lastArticlePublishedAt: blog.lastArticlePublishedAt
      ? formatDate(blog.lastArticlePublishedAt)
      : '',
    createdAt: formatDate(blog.createdAt),
    link: (
      <Link href={blog.href}>
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
      <label className={styles.publicSelectLabel}>
        Pokazuj blogi:{' '}
        <select onChange={handlePublicChange} value={isPublic}>
          <option value="" defaultChecked>
            Wszystkie
          </option>
          <option value="true">Tylko widoczne</option>
          <option value="false">Tylko ukryte</option>
        </select>
      </label>
      <Table columns={columns} data={tableData} />
    </section>
  );
};
