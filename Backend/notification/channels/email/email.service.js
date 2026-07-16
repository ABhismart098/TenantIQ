const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const BASE_TEMPLATE = fs.readFileSync(
  path.join(__dirname, "templates/base.html"),
  "utf-8"
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const renderTemplate = (templateName, data) => {
  const templatePath = path.join(
    __dirname,
    "templates",
    `${templateName}.html`
  );

  let content = fs.readFileSync(templatePath, "utf-8");

  // replace variables
  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    content = content.replace(regex, data[key]);
  });

  // inject into base template
  return BASE_TEMPLATE
    .replace("{{content}}", content)
    .replace("{{title}}", data.title || "TenantIQ")
    .replace("{{year}}", new Date().getFullYear());
};

exports.send = async ({ to, subject, template, data }) => {
  const html = renderTemplate(template, data);

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html
  });
};
