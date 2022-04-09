import Link from 'next/link';
import { useCallback } from 'react';
import { object, string } from 'yup';

import { AuthGuard } from '../../components/AuthGuard/AuthGuard';
import { useQuery } from '../../hooks/useQuery';
import { useSmartQueryParams } from '../../hooks/useSmartQueryParams';
import { getBlogs } from '../../utils/api/getBlogs';
import { includes } from '../../utils/array-utils';
import { formatDate } from '../../utils/date-utils';
import { Table } from '../Table/Table';

import Styles from './adminPanel.module.scss';

import type { ChangeEvent } from 'react';

const columns = [
  ['link', 'Link do bloga'],
  ['name', 'Nazwa bloga'],
  ['isPublic', 'Widoczny'],
  ['creatorEmail', 'E-mail autora'],
  ['lastArticlePublishedAt', 'Ostatnia publikacja'],
  ['createdAt', 'Data zgłoszenia'],
  ['edit', 'Edytuj dane bloga'],
] as const;

const isPublicValues = ['true', 'false', ''] as const;

export const AdminPanel = () => {
  const {
    query: { isPublic },
    changeQuery,
  } = useSmartQueryParams(object({ isPublic: string().oneOf(isPublicValues).default('') }));

  const { value: blogs } = useQuery(useCallback(() => getBlogs(isPublic), [isPublic]));

  const handlePublicChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (includes(isPublicValues, e.currentTarget.value)) {
        void changeQuery({ isPublic: e.currentTarget.value });
      }
    },
    [changeQuery],
  );

  const tableData = blogs?.map((blog) => ({
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
    <AuthGuard userRole="ADMIN">
      <section className={Styles.section}>
        <h2 className={Styles.heading}>Admin Panel - Blogi</h2>
        <label className={Styles.publicSelectLabel}>
          Pokazuj blogi:{' '}
          <select onChange={handlePublicChange} value={isPublic}>
            <option value="" defaultChecked>
              Wszystkie
            </option>
            <option value="true">Tylko widoczne</option>
            <option value="false">Tylko ukryte</option>
          </select>
        </label>
        {tableData && <Table columns={columns} data={tableData} />}
      </section>
    </AuthGuard>
  );
};
