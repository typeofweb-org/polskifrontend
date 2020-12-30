import HCaptcha from '@hcaptcha/react-hcaptcha';
import clsx from 'clsx';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useEffect, useRef, useCallback, useState } from 'react';

import { useAddContentCreatorMutation } from '../../hooks/useAddContentCreatorMutation';
import { Button } from '../Button/Button';

import { FormStatus } from './FormStatus';
import styles from './addContentCreatorForm.module.scss';

export const AddContentCreatorForm = () => {
  const [fields, setFields] = useState({ contentURL: '', email: '' });
  const [token, setToken] = useState<string | null>(null);
  const [mutate, status] = useAddContentCreatorMutation();
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const captchaRef = useRef<null | HCaptcha>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      setFields({ contentURL: '', email: '' });
      setTouched({});
    }
  }, [status]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ currentTarget }) => {
    setTouched((touched) => ({ ...touched, [currentTarget.name]: true }));
    setFields((fields) => ({ ...fields, [currentTarget.name]: currentTarget.value }));
    setIsFormValid(formRef.current?.checkValidity() || false);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (token) {
      setToken(null);
      captchaRef.current?.resetCaptcha();
      void mutate({ ...fields, captchaToken: token });
    }
  };

  const handleCaptchaExpire = useCallback(() => {
    setToken(null);
  }, []);
  const handleCaptchaError = useCallback(() => {
    setToken(null);
  }, []);

  if (!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY) {
    return (
      <div className={styles.errorContainer}>
        <span>
          Wystąpił błąd po stronie serwera, jeśli ten problem będzie się utrzymywał, proszę
          skontaktuj się z administratorem serwisu.
        </span>
      </div>
    );
  }

  const isLoading = status === 'loading';
  const isButtonDisabled = isLoading || !isFormValid || !token;

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(styles.form, isLoading && styles.formLoading)}
      ref={formRef}
    >
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
        {touched['contentURL'] && (
          <span className={styles.errorMessage}>Wprowadzony adres URL jest nieprawidłowy</span>
        )}
      </label>
      <label className={styles.label}>
        Adres email
        <input
          className={styles.input}
          value={fields.email}
          name="email"
          onChange={handleChange}
          placeholder="Podaj swój email"
          required
          type="email"
        />
        {touched['email'] && (
          <span className={styles.errorMessage}>Wprowadzony adres email jest nieprawidłowy</span>
        )}
      </label>
      <div className={styles.wrapper}>
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
          onVerify={setToken}
          onExpire={handleCaptchaExpire}
          onError={handleCaptchaError}
          ref={captchaRef}
          languageOverride="pl"
        />
        <Button type="submit" disabled={isButtonDisabled}>
          Zgłoś
        </Button>
      </div>
      <FormStatus status={status} />
    </form>
  );
};
