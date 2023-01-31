'use client';

import { Button } from '../Button/Button';

import { useCookies } from './useCookies';

export const CookiesPopup = () => {
  const { accepted, accept } = useCookies();

  if (accepted !== 'not-accepted') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full flex-col items-center gap-3 border-2 border-dashed border-primary-dark bg-gray-100 p-6 text-center shadow-md md:bottom-8 md:left-8 md:max-w-xs md:rounded-md">
      <p className="text-black">
        Ta strona, tak jak praktycznie każda w internecie, wykorzystuje ciasteczka.
      </p>
      <Button
        className="appearance-none rounded-md bg-primary-base py-3 px-4 font-bold"
        onClick={accept}
      >
        Rozumiem
      </Button>
    </div>
  );
};
