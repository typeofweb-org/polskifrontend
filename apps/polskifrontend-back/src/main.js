import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cloudinary from 'cloudinary';
import log from './log';
import routes from './controllers';
import config from './config';
import { errorHandle, db } from './utils';
import * as scheduler from './rss/scheduler';

db.init();

cloudinary.config(config.cloudinary);

// error handle
process.on('unhandledRejection', (err) => {
  log.error('unhandledRejection:', err);
  throw err;
});

process.on('uncaughtException', (err) => {
  log.error('uncaughtException:', err);
});

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://www.polskifrontend.pl',
  ],
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
