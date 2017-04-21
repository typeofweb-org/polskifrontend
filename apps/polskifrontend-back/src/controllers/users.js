import express from 'express';
import jwt from 'jsonwebtoken';
import app from '../main';
import { Users } from '../models';

const router = new express.Router();

router.post('/authenticate', async (req, res) => {
  try {
    const user = await Users.getUser(req.body.user);

    if (!user) {
      res.json({ success: false, reason: 'cant-authenticate', message: 'Authentication failed.' });
    } else if (user) {
      // check if password matches
      if (user.password !== req.body.password) {
        res.json({ success: false, reason: 'cant-authenticate', message: 'Authentication failed.' });
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign(user, app.get('secret'), {
          expiresIn: 18000 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          token
        });
      }
    }
  } catch (error) {
    throw error;
  }
});

export default router;
