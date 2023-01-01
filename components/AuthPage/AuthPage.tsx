'use client';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

import { useAuthGuard } from './useAuthGuard';
import { useAuthListener } from './useAuthListener';

export const AuthPage = () => {
  const supabase = createBrowserSupabaseClient();
  const { authView } = useAuthListener(supabase);
  useAuthGuard();

  return (
    <Auth
      supabaseClient={supabase}
      providers={['github']}
      view={authView}
      socialLayout="horizontal"
      appearance={{ theme: ThemeSupa }}
    />
  );
};
