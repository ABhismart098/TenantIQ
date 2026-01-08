const { Approval } = require("../../models");

exports.createApprovalRequest = async (user) => {
  return Approval.create({
    target_user_id: user.user_id,
    requested_role_id: user.role_id,
    status: "PENDING"
  });
};
