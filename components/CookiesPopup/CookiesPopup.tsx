'use client';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import Styles from './cookiesPopup.module.scss';

type CookiesPreferences = 'not-accepted' | 'accepted';

export const CookiesPopup = () => {
  const [accepted, setAccepted] = useLocalStorage<CookiesPreferences>(
    'cookies-accepted',
    'not-accepted',
  );

  if (accepted === 'not-accepted') {
    return (
      <div className={Styles.popup}>
        <p className={Styles.popupText}>
          Ta strona, tak jak praktycznie każda w internecie, wykorzystuje ciasteczka.
        </p>
        <button className={Styles.acceptButton} onClick={() => setAccepted('accepted')}>
          Rozumiem
        </button>
      </div>
    );
  }

  return null;
};
