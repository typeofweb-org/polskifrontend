import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Layout } from '../../../components/Layout';

const AuthGuard = dynamic<{ readonly role?: 'admin' }>(() =>
  import(
    /* webpackChunkName: "AuthGuard" */
    '../../../components/AuthGuard/AuthGuard'
  ).then((mod) => mod.AuthGuard),
);
const UpdateBlogForm = dynamic<{ readonly blogId: string }>(
  import(
    /* webpackChunkName: "UpdateBlogForm" */
    '../../../components/UpdateBlogForm/UpdateBlogForm'
  ).then((mod) => mod.UpdateBlogForm),
);

export default function AdminBlogPage() {
  const router = useRouter();
  const blogId = router.query.blogId;

  if (!blogId) {
    return null;
  }

  return (
    <Layout title="Panel admina - edycja danych bloga">
      <AuthGuard role="admin">
        <UpdateBlogForm blogId={blogId as string} />
      </AuthGuard>
    </Layout>
  );
}
