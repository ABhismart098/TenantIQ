const { ROLE, APPROVAL_RULES } = require("../Src/constants/approval.rules");

exports.canActOnUser = (actingUser, targetUser) => {

  if (!actingUser?.is_active) {
    throw new Error("Inactive users cannot perform this action");
  }

  if (actingUser.user_id === targetUser.user_id) {
    throw new Error("Self action is not allowed");
  }

  const allowedRoles = APPROVAL_RULES[targetUser.role_id] || [];

  if (!allowedRoles.includes(actingUser.role_id)) {
    throw new Error("You are not authorized to perform this action");
  }

  if (
    [ROLE.OWNER, ROLE.ADMIN].includes(targetUser.role_id) &&
    actingUser.role_id !== ROLE.ADMIN
  ) {
    throw new Error("Only admin can perform this action");
  }

  return true;
};
