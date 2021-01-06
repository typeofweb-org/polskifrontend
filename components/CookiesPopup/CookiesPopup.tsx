import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './cookiesPopup.module.scss';

type CookiesPreferences = 'not-accepted' | 'accepted';

export const CookiesPopup = () => {
  const [accepted, setAccepted] = useLocalStorage<CookiesPreferences>(
    'cookies-accepted',
    'not-accepted',
  );

  if (accepted === 'not-accepted') {
    return (
      <div className={styles.popup}>
        <p className={styles.popupText}>
          Ta strona, tak jak praktycznie każda w internecie, wykorzystuje ciasteczka.
        </p>
        <button className={styles.acceptButton} onClick={() => setAccepted('accepted')}>
          Rozumiem
        </button>
      </div>
    );
  }

  return null;
};
