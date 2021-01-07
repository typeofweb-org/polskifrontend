import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';

import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

import styles from './authGuard.module.css';

type Props = {
  readonly role?: 'admin';
};

export const AuthGuard: React.FC<Props> = ({ children, role }) => {
  const [session, isLoading] = useSession();

  useEffect(() => {
    if (!isLoading && !session) {
      // void signIn();
    }
  }, [session, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
