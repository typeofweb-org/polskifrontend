import express from 'express';
import getSitemap from '../helpers/sitemap';

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

export default router;
