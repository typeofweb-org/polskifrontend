import { closeConnection, openConnection } from '../../../../../api-helpers/prisma/db';
import { ButtonAsLink } from '../../../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../../../components/Content/Content';
import { ContentTitle } from '../../../../../components/Content/ContentTitle';
import { LogoutButton } from '../../../../../components/LogoutButton/LogoutButton';
import { DangerZone } from '../../../../../components/UpdateBlogSection/DangerZone';
import { UpdateBlogForm } from '../../../../../components/UpdateBlogSection/UpdateBlogForm';

type AdminBlogPageProps = {
  readonly params: {
    readonly blogId: string;
  };
};

export default function AdminBlogPage({ params }: AdminBlogPageProps) {
  return (
    <>
      <ContentTitle>Aktualizacja danych</ContentTitle>

      <div className="flex gap-3 p-4 md:py-8 md:pb-4">
        <ButtonAsLink href="/admin" icon="arrow-left2">
          Lista Blogów
        </ButtonAsLink>

        <LogoutButton>Wyloguj</LogoutButton>
      </div>

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
  try {
    const prisma = openConnection();

    const blogs = await prisma.blog.findMany();
    const paths = blogs.map(({ id }) => ({ blogId: id }));

    return paths;
  } finally {
    await closeConnection();
  }
};
