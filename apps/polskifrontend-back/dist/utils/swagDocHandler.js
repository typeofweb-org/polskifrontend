'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    // swagger definition comes here
    const swaggerDefinition = {
      info: {
        title: 'EXAMPLE REST API DOC',
        version: '1.0.0',
        description: 'EXAMPLE REST API DOC'
      }
    };
    const options = {
      swaggerDefinition,
      apis: [_path2.default.resolve('src/routes/**/*.js'), _path2.default.resolve('src/models/**/*.js')]
    };

    const swaggerSpec = (0, _swaggerJsdoc2.default)(options);
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();