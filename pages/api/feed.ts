import { withAsync, withDb, withMethods } from '../../api-helpers/api-hofs';
import { getGeneralFeed } from '../../api-helpers/general-feed';

export default withAsync(
  withMethods({
    GET: withDb(async (req, res) => {
      const feed = await getGeneralFeed(req.db);

      res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      // 900 equals revalidation time (15 minutes)
      res.setHeader('Cache-Control', `s-maxage=900, stale-while-revalidate`);

      res.send(feed);

      return null;
    }),
  }),
);
