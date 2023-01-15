import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { ChangeBlogsList } from '../../../components/ChangeBlogsList/ChangeBlogsList';
import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';
import { LogoutButton } from '../../../components/LogoutButton/LogoutButton';
import { Table } from '../../../components/Table/Table';
import { fetchAdminBlogsList } from '../../../utils/fetchAdminBlogsList';

import type { BlogsType } from '../../../types';

type AdminPageProps = {
  readonly params: {
    readonly blogsType: BlogsType;
  };
};

export default async function AdminPage({ params }: AdminPageProps) {
  const blogs = await fetchAdminBlogsList(params.blogsType);

  return (
    <>
      <ContentTitle>Admin Panel - Blogi</ContentTitle>

      <div className="order-2 flex gap-3 p-4 md:py-8 md:pb-4">
        <ButtonAsLink href="/" icon={faArrowLeftLong}>
          Strona Główna
        </ButtonAsLink>

        <LogoutButton>Wyloguj</LogoutButton>
      </div>

      <Content>
        <ChangeBlogsList type={params.blogsType} />
        {blogs.length > 0 && <Table data={blogs} />}
      </Content>
    </>
  );
}

export const generateStaticParams = () => {
  return [
    { blogsType: 'public' },
    { blogsType: 'nonpublic' },
    { blogsType: 'all' },
  ] satisfies readonly { readonly blogsType: BlogsType }[];
};
