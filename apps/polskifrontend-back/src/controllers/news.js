import express from 'express';
import { Newses } from '../models';

const router = new express.Router();

router.get('/:page', async (req, res) => {
  try {
    const { newses, nextPage } = await Newses.getNewses(req.params.page - 1);
    res.send({ success: true, newses, nextPage });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
