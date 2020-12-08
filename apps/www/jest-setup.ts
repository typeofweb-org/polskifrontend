import Dotenv from 'dotenv';
Dotenv.config({ path: '.env.development' });

process.on('unhandledRejection', (err) => {
  fail(err);
});
