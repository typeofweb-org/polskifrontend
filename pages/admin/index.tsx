import Dynamic from 'next/dynamic';

import { Layout } from '../../components/Layout';

const AdminPanel = Dynamic<{}>(() =>
  import(/* webpackChunkName: "AdminPanel" */ '../../components/AdminPanel/AdminPanel').then(
    (mod) => mod.AdminPanel,
  ),
);

export default function AdminPage() {
  return (
    <Layout title="Panel admina">
      <AdminPanel />
    </Layout>
  );
}
