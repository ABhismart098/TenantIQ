const nodemailer = require("nodemailer");

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },

    tls: {
      rejectUnauthorized: false
    }
  });
};

module.exports = createTransporter;