import { withAsync, withDb } from '../../api-helpers/api-hofs';

export default withAsync(
  withDb((req) => {
    return req.db.$queryRaw`SELECT 1 + 1;`;
  }),
);
