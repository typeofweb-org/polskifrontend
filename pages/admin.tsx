import dynamic from 'next/dynamic';

import { Layout } from '../components/Layout';

const AdminPanel = dynamic(() =>
  import('../components/AdminPanel/AdminPanel').then(({ AdminPanel }) => ({ default: AdminPanel })),
);

export default function AdminPage() {
  return (
    <Layout title="Panel admina">
      <AdminPanel />
    </Layout>
  );
}
