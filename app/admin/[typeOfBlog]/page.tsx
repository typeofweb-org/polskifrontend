import { AdminBlogsList } from '../../../components/AdminBlogsList/AdminBlogsList';
import { fetchAdminBlogsList } from '../../../utils/fetchAdminBlogsList';

import type { TypeOfBlogs } from '../../../types';

type AdminPageProps = {
  readonly params: {
    readonly typeOfBlog: TypeOfBlogs;
  };
};

export default async function AdminPage({ params }: AdminPageProps) {
  const data = await fetchAdminBlogsList(params.typeOfBlog);

  return <AdminBlogsList blogs={data} type={params.typeOfBlog} />;
}

export const generateStaticParams = () => {
  return [
    { typeOfBlog: 'public' },
    { typeOfBlog: 'nonpublic' },
    { typeOfBlog: 'all' },
  ] satisfies readonly Record<'typeOfBlog', TypeOfBlogs>[];
};
