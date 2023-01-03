import { AdminBlogsList } from '../../../components/AdminBlogsList/AdminBlogsList';
import { fetchAdminBlogsList } from '../../../utils/fetchAdminBlogsList';

import type { BlogsType } from '../../../types';

type AdminPageProps = {
  readonly params: {
    readonly blogsType: BlogsType;
  };
};

export default async function AdminPage({ params }: AdminPageProps) {
  const data = await fetchAdminBlogsList(params.blogsType);

  return <AdminBlogsList blogs={data} type={params.blogsType} />;
}

export const generateStaticParams = () => {
  return [
    { blogsType: 'public' },
    { blogsType: 'nonpublic' },
    { blogsType: 'all' },
  ] satisfies readonly Record<'blogsType', BlogsType>[];
};
