import { Auth } from '@supabase/ui';
import { useEffect } from 'react';

import { Layout } from '../../components/Layout';
import { supabase } from '../../utils/api/initSupabase';

export default function Login() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      fetch('/api/auth', {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).catch((err) => console.error(err));
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <Layout title="Panel admina">
      {Auth({
        supabaseClient: supabase,
        providers: ['github'],
        view: 'sign_in',
        socialLayout: 'horizontal',
        socialButtonSize: 'xlarge',
      }) ?? null}
    </Layout>
  );
}
