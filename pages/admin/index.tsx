import dynamic from 'next/dynamic';

import { Layout } from '../../components/Layout';

const AuthGuard = dynamic<{ readonly role?: 'admin' }>(() =>
  import(
    /* webpackChunkName: "AuthGuard" */
    '../../components/AuthGuard/AuthGuard'
  ).then((mod) => mod.AuthGuard),
);

const AdminPanel = dynamic<{}>(() =>
  import(/* webpackChunkName: "AdminPanel" */ '../../components/AdminPanel/AdminPanel').then(
    (mod) => mod.AdminPanel,
  ),
);

export default function AdminPage() {
  return (
    <Layout title="Panel admina">
      <AuthGuard role="admin">
        <AdminPanel />
      </AuthGuard>
    </Layout>
  );
}
