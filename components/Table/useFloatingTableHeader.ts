import { useEffect, useMemo, useRef } from 'react';

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

export const useFloatingTableHeader = <T extends HTMLElement>() => {
  const tableRef = useRef<HTMLTableElement>(null);
  const floatingHeaderRef = useRef<T>(null);

  const update = useMemo(
    () =>
      rafThrottle(() => {
        if (!tableRef.current || !floatingHeaderRef.current) {
          return;
        }

        const headers = tableRef.current.querySelectorAll('thead th');
        const spans = floatingHeaderRef.current.querySelectorAll('span');
        const tableRect = tableRef.current.getBoundingClientRect();

        Array.from(headers)
          .map((th) => ({ thRect: th.getBoundingClientRect(), thStyle: getComputedStyle(th) }))
          .forEach(({ thRect, thStyle }, index) => {
            spans[index].style.height = `${thRect.height}px`;
            spans[index].style.width = `${thRect.width}px`;
            cssPropsToCopy.forEach((prop) => (spans[index].style[prop] = thStyle[prop]));
          });

        floatingHeaderRef.current.style.zIndex = '1';
        floatingHeaderRef.current.style.position = 'absolute';
        floatingHeaderRef.current.style.top = '0';
        floatingHeaderRef.current.style.width = `${tableRect.width}px`;
      }),
    [],
  );

  useEffect(() => {
    update();

    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return { tableRef, floatingHeaderRef };
};
