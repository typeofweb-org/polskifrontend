'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (err, req, res, next) {
  const error = {};
  error.msg = err.msg || err.message || 'Unknown reason';
  const status = err.status || '400';
  return res.status(status).send(error);
};