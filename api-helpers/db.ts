import { PrismaClient } from '@prisma/client';
import type { PrismaClientOptions } from '@prisma/client/runtime';

export const prisma = new PrismaClient({
  __internal: { useUds: true },
} as PrismaClientOptions);

let mutableOpenConnections = 0;

export const closeConnection = () => {
  --mutableOpenConnections;
  if (mutableOpenConnections === 0) {
    return prisma.$disconnect();
  }
  return undefined;
};

export const openConnection = () => {
  ++mutableOpenConnections;
  return prisma;
};
