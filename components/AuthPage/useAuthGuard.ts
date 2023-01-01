import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthGuard = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      void router.replace('/admin');
    }
  }, [session, router]);
};
