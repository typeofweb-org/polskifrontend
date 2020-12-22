import { withAsync } from '../../api-helpers/api-hofs';

export default withAsync((_req) => {
  return null;
  // return prisma.$queryRaw('SELECT 1 + 1;');
  // return prisma.$queryRaw('SELECT * FROM "User";');
});
