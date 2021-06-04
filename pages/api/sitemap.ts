import { withAsync, withDb, withMethods } from '../../api-helpers/api-hofs';
import { getSitemap } from '../../api-helpers/sitemap';
import { REVALIDATION_TIME } from '../[displayStyle]/[page]';

export default withAsync(
  withMethods({
    GET: withDb(async (req, res) => {
      const sitemap = await getSitemap(req.db);

      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      // revalidate a bit less frequently than usual
      res.setHeader('Cache-Control', `s-maxage=${REVALIDATION_TIME * 4}, stale-while-revalidate`);

      res.send(sitemap);

      return null;
    }),
  }),
);
