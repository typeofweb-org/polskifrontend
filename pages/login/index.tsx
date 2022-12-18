import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout';

type ViewType = Parameters<typeof Auth>[0]['view'];

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [authView, setAuthView] = useState<ViewType>('sign_in');
  const supabase = useSupabaseClient();

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

  useEffect(() => {
    if (session) {
      void router.replace('/admin');
    }
  }, [session, router]);

  return (
    <Layout title="Panel admina">
      <Auth
        supabaseClient={supabase}
        providers={['github']}
        view={authView}
        socialLayout="horizontal"
        appearance={{ theme: ThemeSupa }}
      />
    </Layout>
  );
}
