import express from 'express';

import basicAuth from '../middlewares/basicAuth';
import adminAuth from '../middlewares/adminAuth';

import blogs from './blogs';
import articles from './articles';
import users from './users';
import feedback from './feedback';
import news from './news';
import admin from './admin';

const router = new express.Router();

// check basic auth on every route
router.use(basicAuth);

// public routes
router.use('/blogs', blogs);
router.use('/articles', articles);
router.use('/users', users);
router.use('/feedback', feedback);
router.use('/news', news);

// check logged in user
router.use(adminAuth);

// admin routes
router.use('/admin', admin);

export default router;
