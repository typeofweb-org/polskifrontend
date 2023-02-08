import Styles from './table.module.scss';

import type { AdminTableBlogsRow } from '../../utils/types/types';

const columns = [
  ['link', 'Link do bloga'],
  ['name', 'Nazwa bloga'],
  ['isPublic', 'Widoczny'],
  ['creatorEmail', 'E-mail autora'],
  ['lastArticlePublishedAt', 'Ostatnia publikacja'],
  ['createdAt', 'Data zgłoszenia'],
  ['edit', 'Edytuj dane bloga'],
] as const;

type TableProps = {
  readonly data: readonly AdminTableBlogsRow[];
};

const isDate = (v: unknown): v is Date => Object.prototype.toString.call(v) === '[object Date]';

export const Table = ({ data }: TableProps) => (
  <div className={Styles.tableWrapper}>
    <table className={Styles.table}>
      <thead>
        <tr>
          {columns.map(([key, label]) => (
            <th key={key}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map(([key]) => {
              const v = row[key];
              return <td key={key}>{isDate(v) ? v.toISOString() : v}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
