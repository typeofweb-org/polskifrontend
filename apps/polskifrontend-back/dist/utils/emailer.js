'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transporter = _nodemailer2.default.createTransport({
  port: 587,
  host: 'smtp.zenbox.pl',
  auth: {
    user: 'request@frontendinsights.com',
    pass: 'LlDM0*8q#fg^'
  },
  secure: false
});

function sendEmail(body) {
  const options = {
    from: 'request@frontendinsights.com',
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