import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  defaultValue: string,
): readonly [string | null, (val: string) => void] {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(localStorage.getItem(key) || defaultValue);
  }, []);

  function setStoredValue(val: string) {
    setValue(val);
    localStorage.setItem(key, val);
  }

  return [value, setStoredValue];
}
