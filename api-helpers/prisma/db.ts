import { PrismaClient } from '@prisma/client';

import { getConfig } from '../config';

let mutableOpenConnections = 0;
let mutablePrisma: PrismaClient | undefined;
export const openConnection = () => {
  if (!mutablePrisma) {
    // use pgbouncer
    mutablePrisma = new PrismaClient({
      datasources: {
        db: {
          url: getConfig('DATABASE_POOL_URL'),
        },
      },
    });
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
