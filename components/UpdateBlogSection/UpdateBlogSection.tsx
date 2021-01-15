import { memo } from 'react';

import { DangerZone } from './DangerZone';
import { UpdateBlogForm } from './UpdateBlogForm';
import styles from './updateBlogSection.module.css';

type Props = {
  readonly blogId: string;
};

export const UpdateBlogSection = memo<Props>(({ blogId }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Aktualizacja danych</h2>
      <UpdateBlogForm blogId={blogId} />
      <h2 className={styles.heading}>"Danger zone"</h2>
      <DangerZone blogId={blogId} />
    </section>
  );
});
UpdateBlogSection.displayName = 'UpdateBlogSection';
