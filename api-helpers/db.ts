import { PrismaClient } from '@prisma/client';

const getHerokuDBCredentials = async () => {
  const res = await fetch(`https://api.heroku.com/apps/polskifrontend/config-vars`, {
    headers: {
      Accept: 'application/vnd.heroku+json; version=3',
      Authorization: `Bearer ${process.env.HEROKU_API_KEY!}`,
    },
  });
  return res.json() as Promise<{ readonly DATABASE_URL: string }>;
};

let mutableOpenConnections = 0;
let mutablePrisma: PrismaClient | undefined;
export const openConnection = async () => {
  if (!mutablePrisma) {
    if (process.env.HEROKU_API_KEY) {
      mutablePrisma = new PrismaClient({
        datasources: {
          db: {
            url: (await getHerokuDBCredentials()).DATABASE_URL,
          },
        },
      });
    } else {
      mutablePrisma = new PrismaClient();
    }
  }

  ++mutableOpenConnections;
  return mutablePrisma;
};

export const closeConnection = () => {
  --mutableOpenConnections;
  if (mutableOpenConnections === 0) {
    return mutablePrisma?.$disconnect();
  }
  return undefined;
};
