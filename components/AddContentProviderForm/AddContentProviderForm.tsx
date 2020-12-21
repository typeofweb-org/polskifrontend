import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useCallback, useState } from 'react';

import { Button } from '../Button/Button';

import styles from './addContentProviderForm.module.scss';
import { useFormReducer } from './utils';

export const AddContentProviderForm = () => {
  const [contentURL, setContentURL] = useState('');
  const [email, setEmail] = useState('');
  const { setIsError, setIsLoading, setIsSuccess } = useFormReducer();

  const handleContentURLChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setContentURL(e.currentTarget.value);
  }, []);

  const handleEmailAddressChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setEmail(e.currentTarget.value);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading();
    try {
      const response = await fetch('https://www.polskifrontend.pl/api/content-provider', {
        method: 'POST',
        body: JSON.stringify({
          contentURL,
          email,
        }),
      });
      if (response.ok) {
        setIsSuccess();
      } else {
        setIsError();
      }
    } catch (e) {
      setIsError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        value={contentURL}
        onChange={handleContentURLChange}
        placeholder="Podaj adres URL"
        type="url"
      />
      <input
        className={styles.input}
        value={email}
        onChange={handleEmailAddressChange}
        placeholder="Podaj swój email (opcjonalne)"
        type="email"
      />
      <div className={styles.wrapper}>
        <Button type="submit">Zgłoś</Button>
      </div>
    </form>
  );
};
