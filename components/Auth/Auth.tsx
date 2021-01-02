import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';

import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

import styles from './auth.module.css';

export const Auth: React.FC = ({ children }) => {
  const [session, isLoading] = useSession();

  useEffect(() => {
    if (!isLoading && !session) {
      void signIn();
    }
  }, [session, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (session?.user.role === 'ADMIN') {
    return <>{children}</>;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Brak uprawnień</h2>
      <p className={styles.p}>
        Nie masz odpowiednich uprawnień, żeby korzystać z tej podstrony. W celu weryfikacji
        skontaktuj się z administracją serwisu.
      </p>
    </section>
  );
};
