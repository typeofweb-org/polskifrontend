import { useLocalStorage } from '../../hooks/useLocalStorage';

type CookiesPreferences = 'not-accepted' | 'accepted';

export const useCookies = () => {
  const [accepted, setAccepted] = useLocalStorage<CookiesPreferences>(
    'cookies-accepted',
    'not-accepted',
  );

  const accept = () => {
    setAccepted('accepted');
  };

  return {
    accepted,
    accept,
  };
};
