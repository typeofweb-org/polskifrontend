'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transporter = _nodemailer2.default.createTransport({
  service: 'gmail',
  auth: {
    user: 'b.dybowski@gmail.com',
    pass: '1kCg6APhKS8e'
  }
});

function sendEmail(body) {
  const options = {
    from: 'info@polskifrontend.pl',
    to: 'kontakt@nafrontendzie.pl',
    subject: 'Nowa prośba o dodanie bloga!!',
    html: body
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject({ success: false, message: error });
      }

      resolve({ success: true, message: info });
    });
  });
}