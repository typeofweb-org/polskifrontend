import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  port: 587,
  host: 'smtp.zenbox.pl',
  auth: {
    user: 'kontakt@polskifrontend.pl',
    pass: 'F50tjgNNtWC4'
  },
  secure: false
});

export default function sendEmail(body, replyTo, subject = 'Nowa prośba o dodanie bloga!!') {
  const options = {
    from: 'kontakt@polskifrontend.pl',
    to: 'kontakt@polskifrontend.pl',
    replyTo,
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
