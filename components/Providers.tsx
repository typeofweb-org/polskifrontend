'use client';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import type { ReactNode } from 'react';

type ProvidersProps = {
  readonly children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
  );
};
