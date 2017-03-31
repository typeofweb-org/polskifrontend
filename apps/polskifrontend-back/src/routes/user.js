import express from 'express';
import sha1 from 'sha1';
import randomstring from 'randomstring';

import { User } from 'models';

const router = new express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: user list
 *     description: return user list
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 */
router.get('/', async (req, res) => {
  const users = await User.find();
  return res.send({ users });
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: user login
 *     description: user login,return user info with token
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: user and password
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               default: username
 *             password:
 *               type: string
 *               default: password
 *     responses:
 *       200:
 *         description: useinfo including token
 */
router.post('/login', async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({
      name,
      password: sha1(password)
    });
    if (user) {
      return res.send(user);
    }
    next({ msg: 'wrong username or password', status: 401 });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: register user
 *     description: create user
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: username and password
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               default: username
 *             password:
 *               type: string
 *               default: password
 *     responses:
 *       200:
 *         description: create new user
 */
router.post('/create', async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const token = `Token ${randomstring.generate(20)}${Date.now()}${randomstring.generate(20)}`;
    let user = await User.findOne({ name });
    if (user) {
      return next({ msg: 'user already existed', status: 403 });
    }
    user = new User({
      name,
      password: sha1(password),
      role: 'user',
      token,
    });
    user = await user.save();
    return res.send(user);
  } catch (err) {
    next(err);
  }
});
export default router;
