'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { ContentTitle } from '../Content/ContentTitle';
import { LoadingScreen } from '../LoadingScreen/LoadingScreen';

import { useAuth } from './useAuth';

import type { ReactNode } from 'react';

type Props = {
  readonly userRole?: 'ADMIN';
  readonly children?: ReactNode;
};

export const AuthGuard: React.FC<Props> = ({ children, userRole: role }) => {
  const { isLoading, isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

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
    <section className="mx-auto max-w-6xl">
      <ContentTitle>Brak Uprawnień</ContentTitle>
      <p className="text-center text-xl text-[#595959]">
        Nie masz odpowiednich uprawnień, żeby korzystać z tej podstrony. W celu weryfikacji
        skontaktuj się z administracją serwisu.
      </p>
    </section>
  );
};
