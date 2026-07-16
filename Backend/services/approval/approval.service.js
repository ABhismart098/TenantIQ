const { AccountReviewLog, User, sequelize } = require("../../models");
const { ROLE, APPROVAL_RULES } = require("../../utils/role-permission");
const VALID_DECISIONS = ["APPROVED", "REJECTED"];




exports.processApproval = async (actingUser, dto) => {
  const { target_user_id, action: decision, reason } = dto;

  if (!["APPROVED", "REJECTED"].includes(decision)) {
    throw new Error("Invalid decision");
  }

  return sequelize.transaction(async (t) => {

    const targetUser = await User.findByPk(target_user_id, { transaction: t });

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    if (actingUser.user_id === target_user_id) throw new Error("Self approval is not allowed");
    if (!actingUser.is_active) throw new Error("Only active users can approve or reject accounts");
    if (targetUser.status !== "PENDING") throw new Error("This account has already been reviewed");

    const allowedApprovers = APPROVAL_RULES[targetUser.role_id] || [];
    if (!allowedApprovers.includes(Number(actingUser.role_id))) {
      throw new Error("You are not authorized to review this account");
    }

    if (
      [ROLE.OWNER, ROLE.ADMIN].includes(targetUser.role_id) &&
      Number(actingUser.role_id) !== ROLE.ADMIN
    ) {
      throw new Error("Only ADMIN can approve");
    }

    const reviewLog = await AccountReviewLog.create(
      {
        target_user_id,
        reviewed_by: actingUser.user_id,
        decision,
        reason
      },
      { transaction: t }
    );

    await targetUser.update(
      {
        status: decision === "APPROVED" ? "ACTIVE" : "REJECTED",
        is_active: decision === "APPROVED"
      },
      { transaction: t }
    );

    return {
      review_id: reviewLog.review_id,
      target_user_id: targetUser.user_id,
      decision,
      reviewed_by: actingUser.user_id
    };
  });
};
