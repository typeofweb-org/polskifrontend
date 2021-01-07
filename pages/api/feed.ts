import { withAsync, withDb, withMethods } from '../../api-helpers/api-hofs';
import { getGeneralFeed } from '../../api-helpers/general-feed';
import { REVALIDATION_TIME } from '../[displayStyle]/[cursor]';

export default withAsync(
  withMethods({
    GET: withDb(async (req, res) => {
      const feed = await getGeneralFeed(req.db);

      res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', `s-maxage=${REVALIDATION_TIME}, stale-while-revalidate`);

      res.send(feed);

      return null;
    }),
  }),
);
