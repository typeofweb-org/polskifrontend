import styles from './blogsTable.module.scss';

type BlogsTableProps<T> = {
  readonly data: readonly T[];
  readonly columns: ReadonlyArray<readonly [Partial<keyof T>, string]>;
};

export function BlogsTable<T>({ data, columns }: BlogsTableProps<T>) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(([key, label]) => (
            <th key={key as string}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(([key]) => (
              <td key={key as string}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
