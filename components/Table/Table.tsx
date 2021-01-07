import styles from './table.module.scss';

type TableProps<T> = {
  readonly data: readonly T[];
  readonly columns: ReadonlyArray<readonly [key: keyof T, label: string]>;
};

export const Table = <T extends { readonly id: string }>({ data, columns }: TableProps<T>) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(([key, label]) => (
            <th key={key as string}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map(([key]) => (
              <td key={key as string}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
