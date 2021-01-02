import dynamic from 'next/dynamic';

import { Layout } from '../../components/Layout';

const Auth = dynamic<{}>(() =>
  import(
    /* webpackChunkName: "Auth" */
    '../../components/Auth/Auth'
  ).then((mod) => mod.Auth),
);

const AdminPanel = dynamic<{}>(() =>
  import(/* webpackChunkName: "AdminPanel" */ '../../components/AdminPanel/AdminPanel').then(
    (mod) => mod.AdminPanel,
  ),
);

export default function AdminPage() {
  return (
    <Layout title="Panel admina">
      <Auth>
        <AdminPanel />
      </Auth>
    </Layout>
  );
}
