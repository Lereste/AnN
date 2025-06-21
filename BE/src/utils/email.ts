import * as nodemailer from "nodemailer";

const sendEmailAsync = async (options: any) => {
  //  Nodemailer =========================================
  // 1) Create a transporter
  // const transport = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST_MAILTRAP,
  //   port: EMAIL_PORT_MAILTRAP | 2525, // Hardcode It
  //   secure: false, // true 465, false for other ports.
  //   auth: {
  //     user: process.env.EMAIL_USERNAME_MAILTRAP,
  //     pass: process.env.EMAIL_PASSWORD_MAILTRAP
  //   },
  //   tls: {
  //     ciphers: "SSLv3",
  //     rejectUnauthorized: false,
  //   },
  //   logger: true,
  //   requireTLS: true,
  // });

  // Gmail settings
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST_GMAIL,
    port: 587, // Hardcode It
    secure: false, // true 465, false for other ports.
    auth: {
      user: process.env.EMAIL_USERNAME_GMAIL,
      pass: process.env.EMAIL_PASSWORD_GMAIL,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    logger: true,
    requireTLS: true,
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Lereste <hohoanghao1999@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: "<p>Coi chừng tao</p>",
  };

  // 3) Actually send the email
  await transport.sendMail(mailOptions);
};

//EXPORT
export {
  sendEmailAsync,
};

// module.exports = sendEmailAsync;