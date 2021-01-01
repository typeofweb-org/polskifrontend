import clsx from 'clsx';
import { memo } from 'react';

import type { Status } from '../../hooks/useAddContentCreatorMutation';

import styles from './FormStatus.module.css';

type Props = {
  readonly status: Status;
};

export const FormStatus = memo<Props>(({ status }) => {
  switch (status) {
    case 'loading':
      return (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-spinner')}></span>
          <span>Oczekiwanie...</span>
        </div>
      );
    case 'error':
      return (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-error')}></span>
          <span>
            Wystąpił błąd podczas dodawania nowego serwisu, sprawdź poprawność danych i spróbuj
            ponownie
          </span>
        </div>
      );
    case 'notRssFound':
      return (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-error')}></span>
          <span>
            Nie udało się odnaleźć pliku rss na twojej stronie, jeśli ten błąd się powtarza, proszę
            skontaktuj się z administratorem.
          </span>
        </div>
      );
    case 'alreadyExisting':
      return (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-error')}></span>
          <span>
            Blog o podanym adresie został już dodany do naszej bazy danych. Jeżeli nie pojawiają się
            najnowsze wpisy, lub masz inne zastrzeżenia - proszę skontaktuj się z administratorem.
          </span>
        </div>
      );
    case 'success':
      return (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-checkmark')}></span>
          <span>
            Dziękujemy za zgłoszenie, dodany serwis pojawi się na stronie po zaakceptowaniu przez
            administrację
          </span>
        </div>
      );
    default:
      return null;
  }
});
FormStatus.displayName = 'FormStatus';
