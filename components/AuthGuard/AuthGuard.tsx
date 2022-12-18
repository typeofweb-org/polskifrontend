import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useQuery } from '../../hooks/useQuery';
import { getMe } from '../../utils/api/getMe';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

import Styles from './authGuard.module.css';

import type { ReactNode } from 'react';

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
  const { value: me, status } = useQuery(getMe);

  if (typeof window === 'undefined') {
    return { isLoading: true };
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
    <section className={Styles.section}>
      <h2 className={Styles.heading}>Brak uprawnień</h2>
      <p className={Styles.p}>
        Nie masz odpowiednich uprawnień, żeby korzystać z tej podstrony. W celu weryfikacji
        skontaktuj się z administracją serwisu.
      </p>
    </section>
  );
};
