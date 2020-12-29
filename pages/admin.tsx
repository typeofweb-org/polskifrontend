import { signIn, signOut, useSession } from 'next-auth/client';

import { Layout } from '../components/Layout';
import { Loading } from '../components/Loading/Loading';

export default function AdminPage() {
  const [session, isLoading] = useSession();

  if (isLoading) {
    return (
      <Layout title="Panel admina">
        <Loading />
      </Layout>
    );
  }

  if (session) {
    return (
      <Layout title="Panel admina">
        <div>Logged in</div>
      </Layout>
    );
  }

  return (
    <Layout title="Panel admina">
      <div>You are not logged</div>
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>
  );
}
