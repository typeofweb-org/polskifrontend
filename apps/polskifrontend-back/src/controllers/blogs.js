import express from 'express';
import sendMail from '../utils/emailer';
import { Blogs } from '../models';

const router = new express.Router();

router.get('/all/:page', async (req, res) => {
  try {
    const { blogs, nextPage } = await Blogs.getBlogs(req.params.page - 1);
    res.send({ success: true, blogs, nextPage });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.post('/submit', async (req, res) => {
  try {
    const body = `<p style="font-size: 1.4em;">
      Adres bloga: ${req.body.blogName},<br /> 
      Email: ${req.body.email || 'nie podano'}
      </p>`;
    const sendingResult = await sendMail(body, req.body.email);
    res.send(sendingResult);
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
