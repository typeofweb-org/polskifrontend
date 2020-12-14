import 'abort-controller/polyfill';
import type { PrismaClient } from '@prisma/client';
import Dotenv from 'dotenv';
import fetch from 'node-fetch';

import { initDb, prisma } from './db';
import { getServerWithPlugins } from './server';

// @ts-ignore
global.fetch = fetch;

Dotenv.config();

declare module '@hapi/hapi' {
  export interface ServerApplicationState {
    readonly db: PrismaClient;
  }
}

const start = async () => {
  console.log(await initDb());
  const server = await getServerWithPlugins();

  // @ts-expect-error
  server.app.db = prisma;

  await server.start();

  console.info('Server running at:', server.info.uri);
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
