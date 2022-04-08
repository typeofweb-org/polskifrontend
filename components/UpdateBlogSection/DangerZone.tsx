import { useRouter } from 'next/router';

import { useMutation } from '../../hooks/useMutation';
import { deleteBlog } from '../../utils/api/deleteBlog';
import { resetBlog } from '../../utils/api/resetBlog';
import { Button } from '../Button/Button';

import styles from './dangerZone.module.scss';

type DangerZoneProps = {
  readonly blogId: string;
};

export const DangerZone = ({ blogId }: DangerZoneProps) => {
  const deleteMutation = useMutation(deleteBlog);
  const resetMutation = useMutation(resetBlog);
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
        window.alert('Nie udało się usunąć bloga.');
      }
    }
  }

  async function handleReset() {
    if (
      window.confirm(
        'Czy na pewno chcesz zresetować tego bloga? Wszystkie jego dane oraz wpisy zostaną usunięte i pobrane na nowo.',
      )
    ) {
      try {
        await resetMutation.mutate(blogId);
        window.alert('Udało się!');
      } catch (err) {
        console.error(err);
        window.alert('Nie udało się usunąć bloga.');
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
          <Button
            buttonStyle="danger"
            onClick={() => {
              void handleDelete();
            }}
          >
            Usuń bloga
          </Button>
          <Button
            buttonStyle="danger"
            onClick={() => {
              void handleReset();
            }}
          >
            Zresetuj bloga
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
