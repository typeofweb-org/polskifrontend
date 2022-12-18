/* eslint-disable @typescript-eslint/consistent-type-assertions -- this is, in principle, unsafe */

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { withAsync, withAuth, withMethods } from '../../../api-helpers/api-hofs';

import type { NextApiRequest, NextApiResponse } from 'next';

export default withAsync(
  withAuth()(
    withMethods({
      async GET(req, res) {
        const supabase = createServerSupabaseClient({ req, res } as unknown as {
          readonly req: NextApiRequest;
          readonly res: NextApiResponse;
        });

        const user = await supabase.auth.getUser();
        const member = await req.db.member.findUnique({
          where: { id: user.data.user?.id },
        });

        return { data: { user: user.data.user, member } };
      },
    }),
  ),
);
