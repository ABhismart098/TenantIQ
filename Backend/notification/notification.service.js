const emailQueue = require("./queue/email.queue");
const { NotificationLog } = require("../models");
const websocketService = require("./channels/websocket/websocket.service");

exports.sendEmail = async ({ to, subject, template, data, user_id }) => {

  // 📝 Create log first
  const log = await NotificationLog.create({
    user_id,
    channel: "EMAIL",
    type: template,
    status: "PENDING"
  });

  await emailQueue.add(
    {
      to,
      subject,
      template,
      data,
      log_id: log.log_id
    },
    {
      attempts: 3,
      backoff: 5000
    }
  );
};
exports.sendRealtime = async ({ user_id, event, data }) => {
  websocketService.sendToUser(user_id, event, data);
};
