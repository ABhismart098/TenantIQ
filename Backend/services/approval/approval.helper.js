const { Approval } = require("../../models");

exports.createApprovalRequest = async (user) => {
  return Approval.create({
    target_user_id: user.user_id,
    approved_by: user.user_id, // audit reference
    action: "PENDING",
    reason: "Awaiting approval"
  });
};
