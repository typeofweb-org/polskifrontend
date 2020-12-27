import type { PrismaError } from './prisma-errors';

export function isPrismaError(err: any): err is PrismaError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Boolean(err && err.code) && /^P\d{4}$/.test(err.code);
}
