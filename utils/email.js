const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const sendEmail = (option) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: "Academy reset<reset@academy.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
