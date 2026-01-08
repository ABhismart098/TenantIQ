const { Approval, User } = require("../../models");

// Role IDs (match roles table)
const ROLE = {
  ADMIN: 1,
  TENANT: 2,
  PROPERTY_MANAGER: 3,
  OWNER: 4
};

exports.processApproval = async (actingUser, dto) => {
  const { target_user_id, action, reason } = dto;

  // 1️⃣ Fetch target user
  const targetUser = await User.findByPk(target_user_id);

  if (!targetUser) {
    throw new Error("Target user not found");
  }

  // 2️⃣ Prevent self-approval
  if (actingUser.id === targetUser.user_id) {
    throw new Error("Self approval is not allowed");
  }

  // 3️⃣ Only ACTIVE users can approve
  if (!actingUser.is_active) {
    throw new Error("Only active users can approve accounts");
  }

  // 4️⃣ Role-based approval rules
  const approvalMatrix = {
    [ROLE.TENANT]: [ROLE.OWNER, ROLE.PROPERTY_MANAGER],
    [ROLE.PROPERTY_MANAGER]: [ROLE.OWNER, ROLE.ADMIN],
    [ROLE.OWNER]: [ROLE.ADMIN],
    [ROLE.ADMIN]: [ROLE.ADMIN]
  };

  const allowedApprovers = approvalMatrix[targetUser.role_id] || [];

  if (!allowedApprovers.includes(actingUser.role_id)) {
    throw new Error("You are not authorized to approve this account");
  }

  // 5️⃣ Create approval record (AUDIT LOG)
  const approval = await Approval.create({
    target_user_id: targetUser.user_id,
    approved_by: actingUser.id,
    action,
    reason
  });

  // 6️⃣ If approved → activate user
  if (action === "APPROVED") {
    await targetUser.update({
      status: "ACTIVE",
      is_active: true
    });
  }

  // 7️⃣ If rejected → mark rejected (NOT active)
  if (action === "REJECTED") {
    await targetUser.update({
      status: "REJECTED",
      is_active: false
    });
  }

  return {
    approval_id: approval.approval_id,
    target_user: targetUser.user_id,
    action,
    approved_by: actingUser.id
  };
};
