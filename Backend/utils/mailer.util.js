const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendResetPasswordEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: `"TenantIQ Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your TenantIQ password",
    html: `
      <p>You requested a password reset.</p>
      <p>This link is valid for <b>30 minutes</b>.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, ignore this email.</p>
    `
  });
};
