const emailQueue = require("../queue/email.queue");
const emailService = require("../channels/email/email.service");
const { NotificationLog } = require("../../models");

emailQueue.process(async (job) => {
  const { to, subject, template, data, log_id } = job.data;

  try {
    await emailService.send({ to, subject, template, data });

    // ✅ Mark as SENT
    await NotificationLog.update(
      { status: "SENT" },
      { where: { log_id } }
    );

  } catch (error) {
    console.error("Email failed:", error.message);

    // ❌ Mark as FAILED
    await NotificationLog.update(
      {
        status: "FAILED",
        error_message: error.message
      },
      { where: { log_id } }
    );

    throw error; // needed for retry
  }
});