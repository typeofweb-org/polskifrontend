import { useEffect, useState } from 'react';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Auth } from '@supabase/auth-ui-react';

type ViewType = Parameters<typeof Auth>[0]['view'];

export const useAuthListener = (supabase: SupabaseClient) => {
  const [authView, setAuthView] = useState<ViewType>('sign_in');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthView('update_password');
      }
      if (event === 'USER_UPDATED') {
        setTimeout(() => setAuthView('sign_in'), 1000);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return {
    authView,
  };
};
