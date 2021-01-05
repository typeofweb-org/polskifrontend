import Boom from '@hapi/boom';

import { logger } from './logger';
import type { PrismaError } from './prisma-errors';

export function isPrismaError(err: any): err is PrismaError {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return Boolean(err && err.code) && /^P\d{4}$/.test(err.code);
}

export function handlePrismaError(err: unknown) {
  if (!isPrismaError(err)) {
    throw err;
  }

  switch (err.code) {
    case 'P2001':
      throw Boom.notFound();
    case 'P2002':
      throw Boom.conflict();
    default:
      logger.error(`Unhandled Prisma error: ${err.code}`);
      break;
  }
}
