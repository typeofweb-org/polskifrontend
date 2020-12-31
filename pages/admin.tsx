import dynamic from 'next/dynamic';

import { Layout } from '../components/Layout';

// eslint-disable-next-line import/dynamic-import-chunkname
const AdminPanel = dynamic(() => import('../components/AdminPanel/AdminPanel'));

export default function AdminPage() {
  return (
    <Layout title="Panel admina">
      <AdminPanel />
    </Layout>
  );
}
