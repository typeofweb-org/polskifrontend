import { closeConnection, openConnection } from '../../../../api-helpers/prisma/db';
import { AuthGuard } from '../../../../components/AuthGuard/AuthGuard';
import { DangerZone } from '../../../../components/UpdateBlogSection/DangerZone';
import { UpdateBlogForm } from '../../../../components/UpdateBlogSection/UpdateBlogForm';

import Styles from './page.module.scss';

type AdminBlogPageProps = {
  readonly params: {
    readonly blogId: string;
  };
};

export default function AdminBlogPage({ params }: AdminBlogPageProps) {
  return (
    <AuthGuard userRole="ADMIN">
      <section className={Styles.section}>
        <h2 className={Styles.heading}>Aktualizacja danych</h2>
        <UpdateBlogForm blogId={params.blogId} />

        <h2 className={Styles.heading}>Danger zone</h2>
        <DangerZone blogId={params.blogId} />
      </section>
    </AuthGuard>
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
