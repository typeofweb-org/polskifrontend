import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Layout } from '../../../components/Layout';

const Auth = dynamic<{}>(() =>
  import(
    /* webpackChunkName: "Auth" */
    '../../../components/Auth/Auth'
  ).then((mod) => mod.Auth),
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
      <Auth>
        <UpdateBlogForm blogId={blogId as string} />
      </Auth>
    </Layout>
  );
}
