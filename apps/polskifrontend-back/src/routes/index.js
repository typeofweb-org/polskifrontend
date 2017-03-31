import express from 'express';
import { ensureLogin } from './privilege';
import routes from './routes';

const router = new express.Router();

// check basic auth
router.use(ensureLogin);

// define routes
router.use(routes);

export default router;
