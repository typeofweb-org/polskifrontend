import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  // this will refresh user's session
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
