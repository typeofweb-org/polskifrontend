import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout';
import { supabase } from '../../utils/api/initSupabase';

type ViewType = Parameters<typeof Auth>[0]['view'];

export default function Login() {
  const { user } = Auth.useUser();
  const router = useRouter();
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
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      })
        .then((res) => res.json())
        .catch((err) => console.error(err));
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      void router.replace('/admin');
    }
  }, [user, router]);

  return (
    <Layout title="Panel admina">
      <Auth
        supabaseClient={supabase}
        providers={['github']}
        view={authView}
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />
    </Layout>
  );
}
