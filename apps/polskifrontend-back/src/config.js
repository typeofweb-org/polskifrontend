const env = process.env.NODE_ENV;
const common = {
  port: 8880,
  cloudinary: {
    cloud_name: 'polskifrontend',
    api_key: '532329827338836',
    api_secret: '9ScQuBAigRt1SDdWN68ogHx_9qY'
  }
};
const config = {
  develop: {
    mongodb: {
      host: '127.0.0.1',
      database: 'polskifrontend'
    },
    secret: 'pl_front'
  },
  production: {
    mongodb: {
      host1: 'ds157280-a0.mlab.com',
      host2: 'ds157280-a1.mlab.com',
      database: 'heroku_m83rr84d',
      user: 'heroku_m83rr84d',
      password: 'nr05d87qo6dsbgtf4ek77mru4v',
      port: '57280'
    },
    secret: 'UOvVBHR6cRGpoRuUD3abaBXvdhO8larp'
  },
  test: {
    mongodb: {
      host: '127.0.0.1',
      database: 'polskifrontend'
    }
  }
};
export default Object.assign(common, config[env]);
