import type { Server } from 'net';

import { PrismaClient } from '@prisma/client';
import type { PrismaClientOptions } from '@prisma/client/runtime';
import TcpPortUsed from 'tcp-port-used';
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

export const openConnection = async () => {
  ++mutableOpenConnections;
  if (
    mutableOpenConnections > 1 ||
    !getConfig('SSH_PRIVATE_KEY').includes('-----BEGIN RSA PRIVATE KEY-----')
  ) {
    return prisma;
  }

  if (await TcpPortUsed.check(8543, '127.0.0.1')) {
    logger.info('PORT IN USE');
    return prisma;
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
        // keepaliveCountMax: 1,
      },
      (err, server) => {
        if (err) {
          // logger.error({ err });
          // return reject(err);
        }
        mutableServer = server;

        server.on('error', (err) => {
          if (
            err?.message === 'This socket has been ended by the other party' ||
            err?.message === 'read ECONNRESET'
          ) {
            // return logger.info(err);
          }
          // return logger.error(err);
        });

        prisma
          .$connect()
          .then(() => resolve(prisma))
          .catch((err) => reject(err));
      },
    );
  });
};
