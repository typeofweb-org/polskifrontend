import express from 'express';
import { Blog, Article } from '../models';
import { swagDocHandler } from '../utils';

const router = new express.Router();

router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  return res.send({ blogs });
});

router.get('/articles/:blog', async (req, res) => {
  const blog_id = req.params.blog;
  const articles = await Article.find({ blog_id });
  return res.send({ articles });
});

// return swagger doc json data.
// open [http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!]
// to use Swagger UI to visualize the doc
router.get('/swagger.json', swagDocHandler);

export default router;
