import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import routes from 'controllers';
import cors from 'cors';
import log from 'log';
import config from 'config';
import { errorHandle, db } from 'utils';
import * as scheduler from './rss/scheduler';

db.init();

// error handle
process.on('unhandledRejection', err => {
  throw err;
});

process.on('uncaughtException', err => {
  log.error('uncaughtException:', err);
});

const app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'https://polskifrontend-front.herokuapp.com', 'http://www.polskifrontend.pl', 'http://polskifrontend.pl'],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  limit: '50mb'
}));

app.set('secret', config.secret);
process.env.JWT_SECRET = config.secret;

app.use('/', routes);

app.use(errorHandle);

scheduler.initRssParsingSchedule();

const port = process.env.PORT || config.port;
app.listen(port, () => {
  log.info(`App is listening on ${port}.`);
});

export default app;
