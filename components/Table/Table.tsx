import Styles from './table.module.scss';

import type { ReactNode } from 'react';

type TableProps<T> = {
  readonly data: readonly T[];
  readonly columns: ReadonlyArray<readonly [key: keyof T & string, label: string]>;
};

const isDate = (v: unknown): v is Date => Object.prototype.toString.call(v) === '[object Date]';

export const Table = <T extends { readonly id: string; readonly [key: string]: ReactNode | Date }>({
  data,
  columns,
}: TableProps<T>) => (
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
