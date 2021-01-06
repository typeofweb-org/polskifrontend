import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

export type DisplayPreferences = 'list' | 'grid';

export const useDisplayPreferences = () => {
  const router = useRouter();
  const [display, setDisplay] = useLocalStorage<DisplayPreferences>('display-preferences', 'list');

  useEffect(() => {
    if (!display) {
      return;
    }
    if (!router.asPath.startsWith(`/${display}`)) {
      const [, , ...rest] = router.pathname.split('/');
      const path = `/${display}/${rest.join('/')}`;
      void router.replace(path, undefined, { shallow: false });
    }
  }, [router, display]);

  return [setDisplay] as const;
};
