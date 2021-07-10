import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../../utils/api/initSupabase';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.body = JSON.parse(req.body) as unknown;
  supabase.auth.api.setAuthCookie(req, res);
}
