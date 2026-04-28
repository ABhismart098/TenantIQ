const { getIO } = require("../../../socket/socket");

exports.sendToUser = (userId, event, data) => {
  const io = getIO();

  io.to(userId).emit(event, data);
};