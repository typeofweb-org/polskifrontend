import { memo } from 'react';

import { AuthGuard } from '../../components/AuthGuard/AuthGuard';

import { DangerZone } from './DangerZone';
import { UpdateBlogForm } from './UpdateBlogForm';
import Styles from './updateBlogSection.module.css';

type Props = {
  readonly blogId: string;
};

export const UpdateBlogSection = memo<Props>(({ blogId }) => {
  return (
    <AuthGuard userRole="ADMIN">
      <section className={Styles.section}>
        <h2 className={Styles.heading}>Aktualizacja danych</h2>
        <UpdateBlogForm blogId={blogId} />
        <h2 className={Styles.heading}>Danger zone</h2>
        <DangerZone blogId={blogId} />
      </section>
    </AuthGuard>
  );
});
UpdateBlogSection.displayName = 'UpdateBlogSection';
