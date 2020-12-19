import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './cookiesPopup.module.scss';

export const CookiesPopup = () => {
  const [accepted, setAccepted] = useLocalStorage('cookies-accepted', '');

  if (!accepted && accepted !== null) {
    return (
      <div className={styles.popup}>
        <p className={styles.popupText}>
          Ta strona, tak jak praktycznie każda w internecie, wykorzystuje ciasteczka.
        </p>
        <button className={styles.acceptButton} onClick={() => setAccepted('true')}>
          Rozumiem
        </button>
      </div>
    );
  }

  return null;
};
