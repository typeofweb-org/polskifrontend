import { withAsync } from '../../api-helpers/api-hofs';
import { prisma } from '../../api-helpers/db';

export default withAsync((_req) => {
  return prisma.$queryRaw('SELECT 1 + 1;');
});
