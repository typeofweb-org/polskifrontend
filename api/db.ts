import type { Server } from 'net';

import { PrismaClient } from '@prisma/client';
import type { PrismaClientOptions } from '@prisma/client/runtime';
import Tunnel from 'tunnel-ssh';

import { getConfig } from './config';
import { logger } from './logger';

export const prisma = new PrismaClient({
  __internal: { useUds: true },
} as PrismaClientOptions);

let mutableOpenConnections = 0;
let mutableServer: Server | undefined;

export const closeConnection = () => {
  --mutableOpenConnections;
  if (mutableOpenConnections === 0) {
    mutableServer?.close((err) => err && logger.error(err));
    return prisma.$disconnect();
  }
  return undefined;
};

export const openConnection = () => {
  ++mutableOpenConnections;
  if (
    mutableOpenConnections > 1 ||
    !getConfig('SSH_PRIVATE_KEY').startsWith('-----BEGIN RSA PRIVATE KEY-----')
  ) {
    return Promise.resolve(prisma);
  }

  return new Promise<PrismaClient>((resolve, reject) => {
    Tunnel(
      {
        username: 'typeofweb',
        host: 's18.mydevil.net',
        dstHost: 'pgsql18.mydevil.net',
        dstPort: 5432,
        localPort: 8543,
        privateKey: getConfig('SSH_PRIVATE_KEY'),
        keepAlive: true,
        keepaliveCountMax: 1,
      },
      (err, server) => {
        if (err) {
          return reject(err);
        }
        mutableServer = server;

        server.on('error', (err) => {
          if (
            err?.message === 'This socket has been ended by the other party' ||
            err?.message === 'read ECONNRESET'
          ) {
            return logger.info(err);
          }
          return logger.error(err);
        });

        prisma
          .$connect()
          .then(() => resolve(prisma))
          .catch((err) => reject(err));
      },
    );
  });
};
