import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

export type DisplayPreferences = 'list' | 'grid';

export const useDisplayPreferences = () => {
  const router = useRouter();
  const [display, setDisplay] = useLocalStorage<DisplayPreferences>('display-preferences', 'list');

  useEffect(() => {
    if (display && router.asPath === '/') {
      void router.replace(`/${display}`);
    }
  }, [router, display]);

  const changeDisplayPreference = (displayPreference: DisplayPreferences) => {
    void router.replace(`/${displayPreference}`);
    setDisplay(displayPreference);
  };

  return [changeDisplayPreference] as const;
};
