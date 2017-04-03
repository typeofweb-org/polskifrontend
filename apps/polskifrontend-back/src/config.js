const env = process.env.NODE_ENV;
const common = {
  develop: {
    port: 8880
  },
  production: {
    port: 80
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
      host: 'ds145780.mlab.com',
      database: 'heroku_0zs85rh3',
      user: 'heroku_0zs85rh3',
      password: '8rnhpj0msjtg0rmdnvosmvstmo',
      port: '45780'
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
export default Object.assign(common[env], config[env]);
