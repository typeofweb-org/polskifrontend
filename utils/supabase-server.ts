import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

export const createSupabaseServerClient = () => {
  return createServerComponentSupabaseClient({
    headers,
    cookies,
  });
};
