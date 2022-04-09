import HCaptcha from '@hcaptcha/react-hcaptcha';
import Clsx from 'clsx';
import { useEffect, useRef, useCallback, useState } from 'react';

import { getConfig } from '../../api-helpers/config';
import { useMutation } from '../../hooks/useMutation';
import { addContentCreator } from '../../utils/api/addContentCreator';
import { Button } from '../Button/Button';

import { FormStatus } from './FormStatus';
import Styles from './addContentCreatorForm.module.scss';

import type { ChangeEventHandler, FormEventHandler } from 'react';

export const AddContentCreatorForm = () => {
  const [fields, setFields] = useState({ contentURL: '', email: '' });
  const [token, setToken] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const captchaRef = useRef<null | HCaptcha>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const { mutate, status, errorCode } = useMutation(addContentCreator);

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

  if (!getConfig('NEXT_PUBLIC_CAPTCHA_SITE_KEY')) {
    return (
      <div className={Styles.errorContainer}>
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
      className={Clsx(Styles.form, isLoading && Styles.formLoading)}
      ref={formRef}
    >
      <label className={Styles.label}>
        Adres URL
        <input
          className={Styles.input}
          value={fields.contentURL}
          name="contentURL"
          onChange={handleChange}
          placeholder="Podaj adres URL"
          required
          type="url"
        />
        {touched['contentURL'] && (
          <span className={Styles.errorMessage}>Wprowadzony adres URL jest nieprawidłowy</span>
        )}
      </label>
      <label className={Styles.label}>
        Adres email
        <input
          className={Styles.input}
          value={fields.email}
          name="email"
          onChange={handleChange}
          placeholder="Podaj swój email"
          required
          type="email"
        />
        {touched['email'] && (
          <span className={Styles.errorMessage}>Wprowadzony adres email jest nieprawidłowy</span>
        )}
      </label>
      <div className={Styles.wrapper}>
        <HCaptcha
          sitekey={getConfig('NEXT_PUBLIC_CAPTCHA_SITE_KEY')}
          onVerify={setToken}
          onExpire={handleCaptchaExpire}
          onError={handleCaptchaError}
          ref={captchaRef}
          languageOverride="pl"
          size="compact"
        />
        <Button type="submit" disabled={isButtonDisabled}>
          Zgłoś
        </Button>
      </div>
      <FormStatus status={status} errorCode={errorCode} />
    </form>
  );
};
