import Boom from '@hapi/boom';
import type { PrismaClient } from '@prisma/client';
import type { NextApiHandler, NextApiRequest } from 'next';
import type { NextAuthOptions, Session } from 'next-auth';
import NextAuth from 'next-auth';
// eslint-disable-next-line import/no-unresolved
import type { WithAdditionalParams } from 'next-auth/_utils';
import Adapters from 'next-auth/adapters';
import type { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

import { withAsync, withDb } from '../../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../../api-helpers/db';

function getNextAuthOptions(prisma: PrismaClient) {
  const options: NextAuthOptions = {
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
      async jwt(token, user) {
        if (!user) {
          // If it's not sign in operation return already created token
          return Promise.resolve(token);
        }

        try {
          const prisma = await openConnection();
          const dbUser = await prisma.user.findUnique({
            where: {
              id: (user as Record<string, number>).id,
            },
            select: { id: true, role: true },
          });

          /* eslint-disable */
          const ret: WithAdditionalParams<JWT> = {
            ...token,
            userId: dbUser?.id,
            role: dbUser?.role,
          };
          return ret;
          /* eslint-enable */
        } catch (err) {
          console.error(err);
          throw Boom.unauthorized();
        } finally {
          await closeConnection();
        }
      },
      session(session, token) {
        /* eslint-disable */
        const ret: WithAdditionalParams<Session> = {
          ...session,
          user: {
            ...session.user,
            role: token.role as any,
            userId: token.userId as any,
          },
        };
        return Promise.resolve(ret);
        /* eslint-enable */
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
