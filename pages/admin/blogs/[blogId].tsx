import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Layout } from '../../../components/Layout';

const UpdateBlogSection = dynamic<{ readonly blogId: string }>(
  import(
    /* webpackChunkName: "UpdateBlogSection" */
    '../../../components/UpdateBlogSection/UpdateBlogSection'
  ).then((mod) => mod.UpdateBlogSection),
);

export default function AdminBlogPage() {
  const router = useRouter();
  const blogId = router.query.blogId;

  if (!blogId) {
    return null;
  }

  return (
    <Layout title="Panel admina - edycja danych bloga">
      <UpdateBlogSection blogId={blogId as string} />
    </Layout>
  );
}
