import Dotenv from 'dotenv';
Dotenv.config();

process.on('unhandledRejection', (err) => {
  fail(err);
});
