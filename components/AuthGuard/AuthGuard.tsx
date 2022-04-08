import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect } from 'react';

import { useQuery } from '../../hooks/useQuery';
import { getMe } from '../../utils/api/getMe';
import { supabase } from '../../utils/api/initSupabase';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

import styles from './authGuard.module.css';

export type AuthHookRet =
  | { readonly isLoading: true; readonly isLoggedIn?: undefined; readonly user?: undefined }
  | {
      readonly isLoggedIn: false;
      readonly isLoading: false;
      readonly user?: undefined;
    }
  | {
      readonly isLoggedIn: true;
      readonly isLoading: false;
      readonly user: {
        readonly user: {
          readonly id: string;
          readonly created_at: string;
        };
        readonly member: {
          readonly id: string;
          readonly email: string;
          readonly role: string;
        };
      };
    };

type Props = {
  readonly userRole?: 'ADMIN';
  readonly children?: ReactNode;
};

const useAuth = (): AuthHookRet => {
  const session = supabase.auth.session();
  const { value: me, status } = useQuery(getMe);

  if (!session?.user) {
    return { isLoggedIn: false, isLoading: false };
  }

  switch (status) {
    case 'loading':
    case 'idle':
      return { isLoading: true };
    case 'error':
      return { isLoggedIn: false, isLoading: false };
    case 'success': {
      if (!me?.user || !me.member) {
        return { isLoggedIn: false, isLoading: false };
      }
      return { isLoggedIn: true, user: me, isLoading: false };
    }
  }
};

export const AuthGuard: React.FC<Props> = ({ children, userRole: role }) => {
  const { isLoading, isLoggedIn, user } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      void push('/login');
    }
  }, [isLoggedIn, isLoading, push]);

  if (!isLoading && !isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Without role allow all authorized users
  if (!role && user) {
    return <>{children}</>;
  }

  if (role === 'ADMIN' && user?.member.role === 'ADMIN') {
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
