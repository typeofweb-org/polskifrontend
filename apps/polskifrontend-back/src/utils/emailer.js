import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 587,
  host: 'smtp.zenbox.pl',
  auth: {
    user: 'request@frontendinsights.com',
    pass: 'LlDM0*8q#fg^'
  },
  secure: false
});

export default function sendEmail(body, subject = 'Nowa prośba o dodanie bloga!!') {
  const options = {
    from: 'request@frontendinsights.com',
    to: 'kontakt@nafrontendzie.pl',
    subject,
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
