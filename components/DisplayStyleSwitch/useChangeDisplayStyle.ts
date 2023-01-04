import { useRouter } from 'next/navigation';

import type { ChangeEvent } from 'react';

const possibleValues = ['list', 'grid'];

export const useChangeDisplayStyle = () => {
  const router = useRouter();

  const changeDisplayStyle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!possibleValues.includes(value)) {
      return;
    }

    router.push(`/${value}`);
  };

  return changeDisplayStyle;
};
