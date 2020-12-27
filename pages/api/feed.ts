import Boom from '@hapi/boom';

import { withAsync } from '../../api-helpers/api-hofs';
import { getGeneralFeed } from '../../api-helpers/general-feed';

// Max cache age in seconds - 15 minutes
const MAX_AGE = 60 * 15;

export default withAsync(async (req, res) => {
  if (req.method !== 'GET') {
    throw Boom.notFound();
  }

  try {
    const feed = await getGeneralFeed();

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', `s-maxage=${MAX_AGE}, stale-while-revalidate`);

    res.send(feed);

    return null;
  } catch (err) {
    throw Boom.internal();
  }
});
