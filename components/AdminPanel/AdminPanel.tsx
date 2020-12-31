import { signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';

import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

import styles from './AdminPanel.module.css';

export const AdminPanel = () => {
  const [session, isLoading] = useSession();

  console.log(session);

  useEffect(() => {
    if (!isLoading && !session) {
      void signIn();
    }
  }, [session, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (session?.user.role === 'ADMIN') {
    return <section></section>; // @to-do admin-panel
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Brak uprawnień</h2>
      <p className={styles.p}>
        Nie masz odpowiednich uprawnień, żeby korzystać z tej podstrony, w celu weryfikacji
        skontaktuj się z administracją serwisu.
      </p>
    </section>
  );
};
