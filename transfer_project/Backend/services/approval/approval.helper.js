const { User } = require("../../models");
const { ROLE, APPROVAL_RULES } = require("../../Src/constants/approval.rules");

/**
 * Get role-based pending approvals
 */
exports.getPendingApprovals = async (actingUser) => {
  // 1️⃣ Only ACTIVE users can review
  if (!actingUser.is_active) {
    throw new Error("Inactive users cannot view pending approvals");
  }

  // 2️⃣ Determine which roles this user can approve
  const approvableRoles = Object.entries(APPROVAL_RULES)
    .filter(([_, approvers]) => approvers.includes(actingUser.role_id))
    .map(([roleId]) => Number(roleId));

  if (!approvableRoles.length) {
    return [];
  }

  // 3️⃣ Strict rule:
  // OWNER / ADMIN → ONLY ADMIN can approve
  if (
    approvableRoles.includes(ROLE.OWNER) &&
    actingUser.role_id !== ROLE.ADMIN
  ) {
    throw new Error("Only admin can review owner or admin accounts");
  }

  // 4️⃣ Fetch pending users
  const pendingUsers = await User.findAll({
    where: {
      status: "PENDING",
      role_id: approvableRoles
    },
    attributes: [
      "user_id",
      "full_name",
      "email",
      "role_id",
      "created_at"
    ],
    order: [["created_at", "ASC"]]
  });

  // 5️⃣ Prevent self-review
  return pendingUsers.filter(
    user => user.user_id !== actingUser.user_id
  );
};
