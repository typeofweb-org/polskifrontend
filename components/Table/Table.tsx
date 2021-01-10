import type { CSSProperties } from 'react';
import { useEffect } from 'react';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import styles from './table.module.scss';
import { useFloatingTableHeader } from './useFloatingTableHeader';

type TableProps<T extends { readonly id: string } = { readonly id: string }> = {
  readonly data: readonly T[];
  readonly columns: ReadonlyArray<readonly [key: keyof T & string, label: string]>;
};

const TableHeaderRow = ({
  as: As,
  columns,
  styles,
}: {
  readonly as: 'span' | 'th';
  readonly styles?: readonly CSSProperties[];
  readonly columns: readonly (readonly [string, string])[];
}) => {
  return (
    <>
      {columns.map(([key, label], index) => (
        <As style={styles?.[index]} key={key}>
          {label}
        </As>
      ))}
    </>
  );
};

const intersectionObserverOptions = {};

export const Table = <T extends { readonly id: string }>({ data, columns }: TableProps<T>) => {
  const { tableRef, floatingHeaderRef } = useFloatingTableHeader<HTMLDivElement>();

  const { setRef, entry } = useIntersectionObserver<HTMLTableSectionElement>(
    intersectionObserverOptions,
  );

  console.log({ entry });

  return (
    <div className={styles.tableWrapper}>
      <div ref={floatingHeaderRef} aria-hidden={true}>
        <TableHeaderRow columns={columns} as="span" />
      </div>
      <table ref={tableRef} className={styles.table}>
        <thead ref={setRef}>
          <tr>
            <TableHeaderRow columns={columns} as="th" />
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map(([key]) => (
                <td key={key}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
