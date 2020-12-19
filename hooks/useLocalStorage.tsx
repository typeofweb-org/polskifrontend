import { useState } from 'react';

import { useDidMount } from './useDidMount';

export function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState<string | null>(null);

  useDidMount(() => {
    try {
      const savedValue = localStorage.getItem(key);
      setValue(savedValue || defaultValue);
    } catch {
      setValue(defaultValue);
    }
  });

  function setStoredValue(val: string) {
    setValue(val);
    try {
      localStorage.setItem(key, val);
    } catch (err) {
      console.error(err);
    }
  }

  return [value, setStoredValue] as const;
}
