import { PrismaClient } from '@prisma/client';

import { getConfig } from '../config';

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var -- global var required
  var prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var -- global var required
  var prismaOpenConnections: number;
}
global.prismaOpenConnections = 0;

export const openConnection = () => {
  if (!global.prisma) {
    // use pgbouncer
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: getConfig('DATABASE_POOL_URL'),
        },
      },
    });
  }

  ++global.prismaOpenConnections;
  return global.prisma;
};

export const closeConnection = () => {
  --global.prismaOpenConnections;
  if (global.prismaOpenConnections === 0) {
    return global.prisma?.$disconnect();
  }
  return undefined;
};
