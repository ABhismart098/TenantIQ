const emailQueue = require("../queue/email.queue");
const emailService = require("../channels/email/email.service");

emailQueue.process(async (job) => {
  const { to, subject, template, data } = job.data;

  console.log("📨 Sending email to:", to);

  await emailService.send({
    to,
    subject,
    template,
    data
  });
});