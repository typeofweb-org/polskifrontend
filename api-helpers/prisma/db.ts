import { PrismaClient } from '@prisma/client';

const getPrisma = () => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  }

  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  return global.prisma;
};

export const prisma = getPrisma();
