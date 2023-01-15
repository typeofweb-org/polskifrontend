import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const logout = async () => {
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      return;
    }

    await supabase.auth.signOut();

    router.push('/');
  };

  return {
    logout,
  };
};
