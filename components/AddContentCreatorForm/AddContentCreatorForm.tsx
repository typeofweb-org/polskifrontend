'use client';

import HCaptcha from '@hcaptcha/react-hcaptcha';
import Clsx from 'clsx';
import { useEffect, useRef, useCallback, useState } from 'react';

import { getConfig } from '../../api-helpers/config';
import { useMutation } from '../../hooks/useMutation';
import { addContentCreator } from '../../utils/api/addContentCreator';

import type { ChangeEventHandler, FormEventHandler } from 'react';

import { Button } from '../Button/Button';

import { FormStatus } from './FormStatus';

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
      <span>
        Wystąpił błąd po stronie serwera, jeśli ten problem będzie się utrzymywał, proszę skontaktuj
        się z administratorem serwisu.
      </span>
    );
  }

  const isLoading = status === 'loading';
  const isButtonDisabled = isLoading || !isFormValid || !token;

  return (
    <form onSubmit={handleSubmit} className={Clsx(isLoading && 'cursor-wait')} ref={formRef}>
      <label className="my-2 block">
        Adres URL
        <input
          className="border-gray-border peer w-full rounded-md border-[1px] py-3 px-4"
          value={fields.contentURL}
          name="contentURL"
          onChange={handleChange}
          placeholder="Podaj adres URL"
          required
          type="url"
        />
        {touched['contentURL'] && (
          <span className="hidden text-sm text-error-color peer-invalid:inline-block">
            Wprowadzony adres URL jest nieprawidłowy
          </span>
        )}
      </label>
      <label className="my-2 block">
        Adres email
        <input
          className="border-gray-border peer w-full rounded-md border-[1px] py-3 px-4"
          value={fields.email}
          name="email"
          onChange={handleChange}
          placeholder="Podaj swój email"
          required
          type="email"
        />
        {touched['email'] && (
          <span className="hidden text-sm text-error-color peer-invalid:inline-block">
            Wprowadzony adres email jest nieprawidłowy
          </span>
        )}
      </label>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <div className="self-center">
          <HCaptcha
            sitekey={getConfig('NEXT_PUBLIC_CAPTCHA_SITE_KEY')}
            onVerify={setToken}
            onExpire={handleCaptchaExpire}
            onError={handleCaptchaError}
            ref={captchaRef}
            languageOverride="pl"
            size="compact"
          />
        </div>

        <Button type="submit" disabled={isButtonDisabled}>
          Dodaj
        </Button>
      </div>

      <FormStatus status={status} errorCode={errorCode} />
    </form>
  );
};
