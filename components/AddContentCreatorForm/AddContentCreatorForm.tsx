import HCaptcha from '@hcaptcha/react-hcaptcha';
import clsx from 'clsx';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useRef, useCallback, useState } from 'react';

import { useAddContentCreatorMutation } from '../../hooks/useAddContentCreatorMutation';
import { Button } from '../Button/Button';

import styles from './addContentCreatorForm.module.scss';

export const AddContentCreatorForm = () => {
  const [fields, setFields] = useState({ contentURL: '', email: '' });
  const [token, setToken] = useState<string | null>(null);
  const [mutate, status] = useAddContentCreatorMutation();
  const captchaRef = useRef<null | HCaptcha>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ currentTarget }) => {
    setFields((fields) => ({ ...fields, [currentTarget.name]: currentTarget.value }));
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (token) {
      void mutate({ ...fields, captchaToken: token });
      setToken(null);
      captchaRef.current?.resetCaptcha();
    }
  };

  const handleCaptchaExpire = useCallback(() => {
    setToken(null);
  }, []);
  const handleCaptchaError = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Adres URL
        <input
          className={styles.input}
          value={fields.contentURL}
          name="contentURL"
          onChange={handleChange}
          placeholder="Podaj adres URL"
          required
          type="url"
        />
        <span className={styles.errorMessage}>Wprowadzony adres URL jest nieprawidłowy</span>
      </label>
      <label className={styles.label}>
        Adres email (opcjonalne)
        <input
          className={styles.input}
          value={fields.email}
          name="email"
          onChange={handleChange}
          placeholder="Podaj swój email (opcjonalne)"
          type="email"
        />
        <span className={styles.errorMessage}>Wprowadzony adres email jest nieprawidłowy</span>
      </label>
      <div className={styles.wrapper}>
        <HCaptcha
          sitekey={process.env.CAPTCHA_SITE_KEY as string}
          onVerify={setToken}
          onExpire={handleCaptchaExpire}
          onError={handleCaptchaError}
          ref={captchaRef}
        />
        <Button type="submit">Zgłoś</Button>
      </div>
      {status === 'loading' && (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-spinner')}></span>
          <span>Oczekiwanie...</span>
        </div>
      )}
      {status === 'error' && (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-error')}></span>
          <span>
            Wystąpił błąd podczas dodawania nowego serwisu, sprawdź poprawność danych i spróbuj
            ponownie
          </span>
        </div>
      )}
      {status === 'success' && (
        <div className={styles.statusContainer}>
          <span className={clsx(styles.statusIcon, 'icon-checkmark')}></span>
          <span>
            Dziękujemy za zgłoszenie, dodany serwis pojawi się na stronie po zaakceptowaniu przez
            administrację
          </span>
        </div>
      )}
    </form>
  );
};
