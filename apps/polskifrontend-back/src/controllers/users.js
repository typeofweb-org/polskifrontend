import express from 'express';
import jwt from 'jsonwebtoken';
import app from '../main';
import { User } from '../models';

const router = new express.Router();

router.post('/authenticate', async (req, res) => {
  // find the user
  User.findOne({
    user: req.body.user
  }, (err, user) => {
    if (err) {
      throw err;
    }

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
  });
});

export default router;
