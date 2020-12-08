import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({
  __internal: { useUds: true },
} as any);

export const initDb = async () => {
  const result = await client.$queryRaw<readonly object[]>`SELECT 1=1 AS "database ready";`;
  return result[0];
};

/**
 * @description Use `request.server.app.db` instead
 */
export const prisma = client; // as never;
