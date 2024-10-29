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
};

module.exports = sendEmail;
