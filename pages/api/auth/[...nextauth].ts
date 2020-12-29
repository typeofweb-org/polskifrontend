import { PrismaClient } from '@prisma/client';
import type { NextApiHandler } from 'next';
import type { InitOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options: InitOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.SECRET,
};
