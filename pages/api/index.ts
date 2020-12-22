import { withAsync } from '../../api-helpers/api-hofs';
import { closeConnection, openConnection } from '../../api-helpers/db';

export default withAsync(async (_req) => {
  try {
    const prisma = await openConnection();
    return prisma.$queryRaw('SELECT 1 + 1;');
  } finally {
    await closeConnection();
  }
});
