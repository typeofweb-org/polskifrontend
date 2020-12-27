import Boom from '@hapi/boom';

import { withAsync } from '../../api-helpers/api-hofs';
import { getGeneralFeed } from '../../api-helpers/general-feed';
import { REVALIDATION_TIME } from '../[displayStyle]/[cursor]';

export default withAsync(async (req, res) => {
  if (req.method !== 'GET') {
    throw Boom.notFound();
  }

  const feed = await getGeneralFeed();

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', `s-maxage=${REVALIDATION_TIME}, stale-while-revalidate`);

  res.send(feed);

  return null;
});
