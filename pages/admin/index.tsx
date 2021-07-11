import dynamic from 'next/dynamic';

import { Layout } from '../../components/Layout';

const AdminPanel = dynamic<{}>(() =>
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
