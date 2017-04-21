import express from 'express';
import { Article } from '../models';

const router = new express.Router();

router.get('/all/:page', async (req, res) => {
  try {
    const perPage = 50;
    const page = req.params.page - 1;
    const count = await Article.count();
    const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
    const articles = await Article
      .find()
      .populate('_blog')
      .sort({ date: -1 })
      .skip(perPage * page)
      .limit(perPage);
    res.send({ success: true, articles, nextPage });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.get('/:blog', async (req, res) => {
  try {
    const blog_id = req.params.blog;
    const articles = await Article.find({_blog: blog_id}).sort({date: -1}).limit(5);
    res.send({ success: true, articles });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
