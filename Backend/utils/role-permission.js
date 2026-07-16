const { ROLE, APPROVAL_RULES } = require("../src/constants/approval.rules");

exports.canActOnUser = (actingUser, targetUser) => {
  if (!actingUser?.is_active) throw new Error("Inactive users cannot perform this action");
  if (actingUser.user_id === targetUser.user_id) throw new Error("Self action is not allowed");

  const allowedRoles = APPROVAL_RULES[targetUser.role_id] || [];
  if (!allowedRoles.includes(Number(actingUser.role_id))) {
    throw new Error("You are not authorized to perform this action");
  }

  return true;
};

module.exports = {
  ROLE,
  APPROVAL_RULES,
  canActOnUser: exports.canActOnUser
};
