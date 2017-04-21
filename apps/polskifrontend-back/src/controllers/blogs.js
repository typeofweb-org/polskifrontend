import express from 'express';
import sendMail from '../utils/emailer';
import { Blog } from '../models';

const router = new express.Router();

router.get('/:page', async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page - 1;
    const count = await Blog.count();
    const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
    const blogs = await Blog
      .find()
      .sort({ publishedDate: -1 })
      .skip(perPage * page)
      .limit(perPage);
    res.send({ success: true, blogs, nextPage });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const body = `<p style="font-size: 1.4em;">
      Adres bloga: <a href="${req.body.blogName}">${req.body.blogName}</a>, 
      email: ${req.body.email || 'nie podano'}
      </p>`;
    const sendingResult = await sendMail(body);
    res.send(sendingResult);
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
