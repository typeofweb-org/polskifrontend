import Boom from '@hapi/boom';
import type { PrismaClient } from '@prisma/client';
import type { NextApiHandler, NextApiRequest } from 'next';
import type { InitOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import { withAsync, withDb } from '../../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../../api-helpers/db';

function getNextAuthOptions(prisma: PrismaClient) {
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
      jwt: async (token, user?) => {
        if (!user) {
          // If it's not sign in operation return already created token
          return Promise.resolve(token);
        }

        try {
          const prisma = await openConnection();
          const dbUser = await prisma.user.findUnique({
            where: {
              id: (user as Record<string, number>).id,
              email: (user as Record<string, string>).email ?? undefined,
            },
            select: { id: true, role: true },
          });
          token.userId = dbUser?.id;
          token.role = dbUser?.role;
          return token;
        } catch (err) {
          console.error(err);
          throw Boom.unauthorized();
        } finally {
          await closeConnection();
        }
      },
      session: (session, token) => {
        return Promise.resolve({
          ...session,
          user: {
            ...session.user,
            role: token.role,
            userId: token.userId,
          },
        });
      },
    },
  };
  return options;
}

const authHandler: NextApiHandler = withAsync(
  withDb(async (req, res) => {
    const options = getNextAuthOptions(req.db);
    const result: unknown = await NextAuth((req as unknown) as NextApiRequest, res, options);
    return result ?? null;
  }),
);

export default authHandler;
