import express from 'express';
import getSitemap from '../helpers/sitemap';
import getOutgoingFeed from '../helpers/outgoingFeed';

const router = new express.Router();

router.get('/sitemap', async (req, res) => {
  try {
    const sitemap = await getSitemap();

    sitemap.toXML((error, xml) => {
      if (error) {
        return res.send({ success: false, message: error });
      }

      res.send({ success: true, xml });
    });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.get('/feed', async (req, res) => {
  try {
    const feed = await getOutgoingFeed();
    return res.send({ success: true, feed: feed.xml({ indent: true }) });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
