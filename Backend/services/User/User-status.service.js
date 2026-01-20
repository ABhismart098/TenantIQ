const { User, AccountReviewLog, sequelize } = require("../../models");
const { APPROVAL_RULES } = require("../../Src/constants/approval.rules");

exports.updateUserStatus = async (actingUser, dto) => {
  const { target_user_id, is_active, reason } = dto;

  // 1️⃣ Fetch target user
  const targetUser = await User.findByPk(target_user_id);

  if (!targetUser) {
    throw new Error("Target user not found");
  }

  // 2️⃣ Prevent self action
  if (actingUser.user_id === target_user_id) {
    throw new Error("You cannot modify your own account");
  }

  // 3️⃣ Role-based permission check
  const allowedApprovers = APPROVAL_RULES[targetUser.role_id] || [];

  if (!allowedApprovers.includes(actingUser.role_id)) {
    throw new Error("You are not authorized to perform this action");
  }

  // 4️⃣ Transaction (MANDATORY)
  return await sequelize.transaction(async (t) => {

    // Update user
    await targetUser.update(
      { is_active },
      { transaction: t }
    );

    // Audit log
    const review = await AccountReviewLog.create(
      {
        target_user_id,
        reviewed_by: actingUser.user_id,
        decision: is_active ? "APPROVED" : "REJECTED",
        reason: reason || (is_active ? "User enabled" : "User disabled")
      },
      { transaction: t }
    );

    return {
      user_id: targetUser.user_id,
      is_active: targetUser.is_active,
      review_id: review.review_id
    };
  });
};
