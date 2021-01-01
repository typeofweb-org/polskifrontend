import clsx from 'clsx';
import { memo } from 'react';

import type { Status } from '../../hooks/useMutation';

import styles from './FormStatus.module.css';

type Props = {
  readonly status: Status;
  readonly errorCode: number | null;
};

const errorToMessage: Record<number, string> = {
  409: 'Blog o podanym adresie został już dodany do naszej bazy danych. Jeżeli nie pojawiają się najnowsze wpisy, lub masz inne zastrzeżenia - proszę skontaktuj się z administratorem.',
  422: 'Nie udało się odnaleźć pliku RSS na twojej stronie, jeśli ten błąd się powtarza, proszę skontaktuj się z administratorem.',
};

function getStatusMessage({ status, errorCode }: Props) {
  switch (status) {
    case 'loading':
      return 'Oczekiwanie...';
    case 'success':
      return 'Dziękujemy za zgłoszenie, dodany serwis pojawi się na stronie po zaakceptowaniu przez administrację';
    case 'error':
      return errorCode
        ? errorToMessage[errorCode]
        : 'Wystąpił błąd podczas dodawania nowego serwisu, sprawdź poprawność danych i spróbuj ponownie';
    default:
      return null;
  }
}

export const FormStatus = memo<Props>(({ status, errorCode }) => {
  if (status === 'idle') {
    return null;
  }

  return (
    <div className={styles.statusContainer}>
      <span
        className={clsx(styles.statusIcon, {
          'icon-spinner': status === 'loading',
          'icon-checkmark': status === 'success',
          'icon-error': status === 'error',
        })}
      ></span>
      <span>{getStatusMessage({ status, errorCode })}</span>
    </div>
  );
});
FormStatus.displayName = 'FormStatus';
