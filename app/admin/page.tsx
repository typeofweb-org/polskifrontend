import { AdminBlogsList } from '../../components/AdminBlogsList/AdminBlogsList';
import { fetchAdminBlogsList } from '../../utils/fetchAdminBlogsList';

export default async function AdminPage() {
  const data = await fetchAdminBlogsList('all');

  return <AdminBlogsList blogs={data} type="all" />;
}
