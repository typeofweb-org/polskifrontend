import express from 'express';
import sendMail from '../utils/emailer';

const router = new express.Router();

router.post('/', async (req, res) => {
  try {
    const subject = 'Zgłoszono uwagi do serwisu Polski Front-End';
    const body = `<p style="font-size: 1.4em;">
      Email: ${req.body.email}<br /> 
      Treść: <br />
      <i>${req.body.feedback}</i>
      </p>`;
    const sendingResult = await sendMail(body, req.body.email, subject);
    res.send(sendingResult);
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

export default router;
