import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { ReactNode } from 'react';

type AuthRedirectProviderProps = {
  readonly children: ReactNode;
};

export const AuthRedirectProvider = ({ children }: AuthRedirectProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    // redirect for auth
    if (typeof window === 'undefined') {
      return;
    }

    // it might have 5 properties: access_token, expires_in, provider_token, refresh_token, token_type
    // we only care about 3
    const searchParams = new URLSearchParams(location.hash.slice(1));
    const properties = ['access_token', 'provider_token', 'refresh_token'];
    const shouldRedirect = properties.some((p) => searchParams.has(p));

    if (shouldRedirect) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};
