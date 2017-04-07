import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'b.dybowski@gmail.com',
    pass: '1kCg6APhKS8e'
  }
});

export default function sendEmail(body) {
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
