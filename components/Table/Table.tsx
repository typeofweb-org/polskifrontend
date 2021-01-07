import { useEffect, useMemo, useRef } from 'react';

import styles from './table.module.scss';

type TableProps<T> = {
  readonly data: readonly T[];
  readonly columns: ReadonlyArray<readonly [key: keyof T, label: string]>;
};

const rafThrottle = <T extends readonly unknown[]>(
  fn: (...args: T) => any,
): ((...args: T) => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }
  const fnToThrottle = window.requestIdleCallback || window.requestAnimationFrame;

  let isPainting = false;
  return (...args) => {
    if (isPainting) {
      return;
    }
    isPainting = true;
    fnToThrottle(
      () => {
        fn(...args);
        setTimeout(() => (isPainting = false));
      },
      { timeout: 100 },
    );
  };
};

const cssPropsToCopy = [
  'display',
  'verticalAlign',
  'textAlign',
  'font',
  'background',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'padding',
] as const;

const useFloatingTableHeader = <T extends HTMLElement>() => {
  const tableRef = useRef<HTMLTableElement>(null);
  const targetRef = useRef<T>(null);

  const update = useMemo(
    () =>
      rafThrottle(() => {
        if (!tableRef.current || !targetRef.current) {
          return;
        }

        const headers = tableRef.current.querySelectorAll('thead th');
        const newElements = Array.from(headers).map((th) => {
          const thRect = th.getBoundingClientRect();
          const thStyle = getComputedStyle(th);
          const span = document.createElement('span');
          span.innerHTML = th.innerHTML;
          span.style.height = `${thRect.height}px`;
          span.style.width = `${thRect.width}px`;
          cssPropsToCopy.forEach((prop) => (span.style[prop] = thStyle[prop]));
          return span;
        });

        const tableRect = tableRef.current.getBoundingClientRect();
        targetRef.current.innerHTML = '';
        targetRef.current.style.zIndex = '1';
        targetRef.current.style.position = 'absolute';
        targetRef.current.style.width = `${tableRect.width}px`;
        newElements.forEach((el) => targetRef.current?.appendChild(el));

        console.log(tableRef.current, targetRef.current);
      }),
    [],
  );

  useEffect(() => {
    update();

    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  });

  return { tableRef, targetRef };
};

export const Table = <T extends { readonly id: string }>({ data, columns }: TableProps<T>) => {
  const { tableRef, targetRef } = useFloatingTableHeader<HTMLDivElement>();
  return (
    <div className={styles.tableWrapper}>
      <div ref={targetRef} />
      <table ref={tableRef} className={styles.table}>
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
};
