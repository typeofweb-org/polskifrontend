import { withAsync } from '../../api/api-hofs';
import { prisma } from '../../api/db';

export default withAsync((_req) => {
  return prisma.$queryRaw('SELECT 1 + 1;');
  // return prisma.$queryRaw('SELECT * FROM "User";');
});
