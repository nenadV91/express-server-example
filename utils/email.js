const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log('Called here with options', options);

  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    logger: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: 'Nenad Vracar <nenad@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log('Called here with mail options', mailOptions);

  // 3. Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
