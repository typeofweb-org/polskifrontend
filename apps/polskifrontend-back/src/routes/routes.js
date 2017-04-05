import express from 'express';
import { Blog, Article, User } from '../models';
import jwt from 'jsonwebtoken';
import app from '../main';

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

router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, reason: 'bad-token', message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      reason: 'no-token',
      message: 'No token provided.'
    });
  }
});

router.get('/admin/blogs', async (req, res) => {
  const blogs = await Blog.find();
  return res.send({ blogs });
});

router.delete('/admin/blogs/:blogId', async (req, res) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId, (error, blog) => {
    if (error) {
      return res.send({ success: false, reason: 'cant-find', message: `Unable to delete blog with ID: ${blogId}` });
    }

    // hack to call pre middleware
    blog.remove(err => {
      if (err) {
        return res.send({ success: false, reason: 'cant-remove', message: `Unable to delete blog with ID: ${blogId}` });
      }

      Blog.find((error, blogs) => res.send({ success: true, blogs }));
    });
  });
});

router.post('/admin/blogs', async (req, res) => {
  const blog = new Blog(req.body);
  blog.save((error, createdBlog) => {
    if (error) {
      res.send({ success: false, reason: 'cant-add', message: 'New blog entity adding failed' });
    }
    res.send({ success: true, blog: createdBlog });
  });
});

export default router;
