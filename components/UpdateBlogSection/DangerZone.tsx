import { useRouter } from 'next/router';

import { useMutation } from '../../hooks/useMutation';
import { deleteBlog } from '../../utils/api/deleteBlog';
import { Button } from '../Button/Button';

import styles from './dangerZone.module.scss';

type DangerZoneProps = {
  readonly blogId: string;
};

export const DangerZone = ({ blogId }: DangerZoneProps) => {
  const deleteMutation = useMutation(deleteBlog);
  const router = useRouter();

  async function handleDelete() {
    if (
      window.confirm(
        'Czy na pewno chcesz usunąć bloga? Wszystkie jego dane oraz wpisy zostaną nieodwracalnie usunięte.',
      )
    ) {
      try {
        await deleteMutation.mutate(blogId);
        await router.push('/admin');
      } catch (err) {
        console.error(err);
        window.alert('Nie udało się usunąć bloga');
      }
    }
  }

  return (
    <section className={styles.section}>
      <ul className={styles.optionList}>
        <li className={styles.optionListItem}>
          <h3>Usuń bloga</h3>
          <p>
            Blog oraz wszystkie jego artykuły zostaną nieodwracalnie usunięte z serwisu
            polskifrontend.pl
          </p>
          <Button buttonStyle="danger" onClick={handleDelete}>
            Usuń bloga
          </Button>
        </li>
        {/**
         * @TODO Change RSS URL and remove all articles functionality
         */}
      </ul>
    </section>
  );
};
DangerZone.displayName = 'DangerZone';
