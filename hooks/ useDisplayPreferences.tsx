import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useDidMount } from './useDidMount';
import { useDidUpdate } from './useDidUpdate';
import { useLocalStorage } from './useLocalStorage';

export type DisplayPreferences = 'list' | 'grid';

export const useDisplayPreferences = () => {
  const router = useRouter();
  const [display, setDisplay] = useLocalStorage<DisplayPreferences>('display-preferences', 'list');
  const changeDisplayInRouter = useCallback(() => {
    if (display) {
      void router.push(`/${display}`);
    }
  }, [router, display]);

  useDidMount(() => {
    if (display && router.asPath === '/') {
      void router.replace(`/${display}`);
    }
  });

  useDidUpdate(changeDisplayInRouter);

  return [setDisplay] as const;
};
