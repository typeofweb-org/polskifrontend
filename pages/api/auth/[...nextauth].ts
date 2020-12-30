import type { NextApiHandler } from 'next';
import type { InitOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import { useImperativeHandle } from 'react';

import { openConnection } from '../../../api-helpers/db';

const authHandler: NextApiHandler = async (req, res) => {
  const prisma = await openConnection();
  const options: InitOptions = {
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
    ],
    secret: process.env.SECRET,
    adapter: Adapters.Prisma.Adapter({
      prisma,
    }),
    session: {
      jwt: true,
      maxAge: 24 * 60 * 60, // 1 day
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      session: async (session, user) => {
        const prisma = await openConnection();
        console.log(user);
        return Promise.resolve(session);
      },
    },
  };

  return NextAuth(req, res, options);
};

export default authHandler;
