import { memo } from 'react';

import { UpdateBlogForm } from './UpdateBlogForm';
import styles from './updateBlogSection.module.css';

type Props = {
  readonly blogId: string;
};

export const UpdateBlogSection = memo<Props>(({ blogId }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Formularz aktualizacji danych bloga</h2>
      <UpdateBlogForm blogId={blogId} />
    </section>
  );
});
UpdateBlogSection.displayName = 'UpdateBlogSection';
