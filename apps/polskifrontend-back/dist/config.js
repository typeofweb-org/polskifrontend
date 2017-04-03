'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const env = process.env.NODE_ENV;
const common = {
  port: 8880
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
      host: '127.0.0.1',
      database: 'polskifrontend'
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
exports.default = Object.assign(common, config[env]);