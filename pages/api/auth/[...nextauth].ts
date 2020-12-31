import Boom from '@hapi/boom';
import type { NextApiHandler } from 'next';
import type { InitOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';

import { closeConnection, openConnection } from '../../../api-helpers/db';

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
      jwt: async (token, user?) => {
        if (!user) {
          // If it's not sign in operation return already created token
          return Promise.resolve(token);
        }

        const userId = user.userId;
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });
          token.userId = userId;
          token.role = user?.role;
          return Promise.resolve(token);
        } catch (err) {
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

  return NextAuth(req, res, options);
};

export default authHandler;
