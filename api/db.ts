import { PrismaClient } from '@prisma/client';
import type { PrismaClientOptions } from '@prisma/client/runtime';

export const prisma = new PrismaClient({
  __internal: { useUds: true },
} as PrismaClientOptions);
