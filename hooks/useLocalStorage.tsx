import { useCallback, useState } from 'react';

import { useDidMount } from './useDidMount';

export function useLocalStorage<T extends string>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T | null>(null);

  useDidMount(() => {
    try {
      const savedValue = localStorage.getItem(key);
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- @todo validate this
      setValue((savedValue as T) || defaultValue);
    } catch {
      setValue(defaultValue);
    }
  });

  const setStoredValue = useCallback(
    (val: T) => {
      setValue(val);
      try {
        localStorage.setItem(key, val);
      } catch (err) {
        console.error(err);
      }
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
