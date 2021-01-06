import Boom from '@hapi/boom';

import { withAsync } from '../../api-helpers/api-hofs';
import { getSitemap } from '../../api-helpers/sitemap';
import { REVALIDATION_TIME } from '../[displayStyle]/[cursor]';

export default withAsync(async (req, res) => {
  if (req.method !== 'GET') {
    throw Boom.notFound();
  }

  const sitemap = await getSitemap();

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // revalidate a bit less frequently than usual
  res.setHeader('Cache-Control', `s-maxage=${REVALIDATION_TIME * 4}, stale-while-revalidate`);

  res.send(sitemap);

  return null;
});
