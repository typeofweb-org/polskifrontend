import mongoose from 'mongoose';
import log from 'log';
import config from '../config';

const { host, database, user, password } = config.mongodb;
let status = 'DISCONNETED';

const init = () => {
  if (status === 'DISCONNETED') {
    let mongoUrl = `mongodb://${host}/${database}`;
    if (user && password) {
      mongoUrl = `mongodb://${user}:${password}@${host}:27017/${database}?authSource=admin`;
    }
    mongoose.connect(mongoUrl);
    status = 'CONNECTING';
    const db = mongoose.connection;
    return new Promise((resolve, reject) => {
      db.on('error', err => {
        status = 'DISCONNETED';
        log.error(err);
        reject(err);
      });
      db.once('open', () => {
        status = 'CONNECTED';
        log.info('Database connected');
        resolve();
      });
    });
  }
};

export default { init };
