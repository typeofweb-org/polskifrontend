import { ButtonAsLink } from '../../../../components/ButtonAsLink/ButtonAsLink';
import { ChangeBlogsList } from '../../../../components/ChangeBlogsList/ChangeBlogsList';
import { Content } from '../../../../components/Content/Content';
import { ContentNavigation } from '../../../../components/Content/ContentNavigation';
import { ContentTitle } from '../../../../components/Content/ContentTitle';
import { LogoutButton } from '../../../../components/LogoutButton/LogoutButton';
import { Table } from '../../../../components/Table/Table';
import { fetchAdminBlogsList } from '../../../../utils/fetchAdminBlogsList';

import type { BlogsType } from '../../../../types';

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

      <ContentNavigation>
        <ButtonAsLink href="/" icon="arrow-left2">
          Strona Główna
        </ButtonAsLink>

        <LogoutButton>Wyloguj</LogoutButton>
      </ContentNavigation>

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
