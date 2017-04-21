import express from 'express';
import { Articles } from '../models';

const router = new express.Router();

router.get('/all/:page', async (req, res) => {
  try {
    const { articles, nextPage } = await Articles.getArticles(req.params.page - 1);
    res.send({ success: true, articles, nextPage });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.get('/:blog', async (req, res) => {
  try {
    const articles = await Articles.getArticlesByBlogId(req.params.blog);
    res.send({ success: true, articles });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
