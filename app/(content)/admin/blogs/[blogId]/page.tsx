import { openConnection } from '../../../../../api-helpers/prisma/db';
import { ButtonAsLink } from '../../../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../../../components/Content/Content';
import { ContentNavigation } from '../../../../../components/Content/ContentNavigation';
import { ContentTitle } from '../../../../../components/Content/ContentTitle';
import { LogoutButton } from '../../../../../components/LogoutButton/LogoutButton';
import { DangerZone } from '../../../../../components/UpdateBlogSection/DangerZone';
import { UpdateBlogForm } from '../../../../../components/UpdateBlogSection/UpdateBlogForm';

type AdminBlogPageProps = {
  readonly params: {
    readonly blogId: string;
  };
};

export const revalidate = 0;

export default function AdminBlogPage({ params }: AdminBlogPageProps) {
  return (
    <>
      <ContentTitle>Aktualizacja danych</ContentTitle>

      <ContentNavigation>
        <ButtonAsLink href="/admin" icon="arrow-left2">
          Lista Blogów
        </ButtonAsLink>

        <LogoutButton>Wyloguj</LogoutButton>
      </ContentNavigation>

      <Content>
        <UpdateBlogForm blogId={params.blogId} />
      </Content>

      <ContentTitle>Danger zone</ContentTitle>

      <Content>
        <DangerZone blogId={params.blogId} />
      </Content>
    </>
  );
}

export const generateStaticParams = async () => {
  const prisma = openConnection();

  const blogs = await prisma.blog.findMany();
  const paths = blogs.map(({ id }) => ({ blogId: id }));

  return paths;
};
