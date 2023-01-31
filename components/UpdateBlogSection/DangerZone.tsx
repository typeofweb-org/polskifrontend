'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '../../hooks/useMutation';
import { deleteBlog } from '../../utils/api/deleteBlog';
import { resetBlog } from '../../utils/api/resetBlog';
import { Button } from '../Button/Button';

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
        router.push('/admin');
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
    <div>
      <h3 className="text-lg font-semibold">Usuń bloga</h3>
      <p>
        Blog oraz wszystkie jego artykuły zostaną nieodwracalnie usunięte z serwisu
        polskifrontend.pl
      </p>
      <div className="mt-3 flex flex-row gap-3">
        <Button
          onClick={() => {
            void handleDelete();
          }}
        >
          Usuń bloga
        </Button>
        <Button
          onClick={() => {
            void handleReset();
          }}
        >
          Zresetuj bloga
        </Button>
      </div>
      {/**
       * @TODO Change RSS URL and remove all articles functionality
       */}
    </div>
  );
};
DangerZone.displayName = 'DangerZone';
