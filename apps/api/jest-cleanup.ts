import { getConfig } from './src/config';
import { prisma } from './src/db';
const dbName = getConfig('DB_NAME');
if (!dbName.includes('test')) {
  process.exitCode = 2;
  throw new Error('Invalid DB');
}

void (async () => {
  await prisma.$queryRaw(`DROP SCHEMA IF EXISTS public CASCADE;`);
  await prisma.$queryRaw(`CREATE SCHEMA public;`);
})()
  .catch((err) => {
    console.error(err);
    process.exit(3);
  })
  .then(() => {
    process.exit();
  });
