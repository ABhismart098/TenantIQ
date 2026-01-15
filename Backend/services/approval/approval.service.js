const { AccountReviewLog, User, sequelize } = require("../../models");
const { ROLE, APPROVAL_RULES } = require("../../Src/constants/approval.rules");

const VALID_DECISIONS = ["APPROVED", "REJECTED"];

exports.processApproval = async (actingUser, dto) => {
  const { target_user_id, action: decision, reason } = dto;

  // 0️⃣ Validate decision early
  if (!VALID_DECISIONS.includes(decision)) {
    throw new Error("Invalid decision. Must be APPROVED or REJECTED");
  }

  return sequelize.transaction(async (t) => {

    // 1️⃣ Fetch target user
    const targetUser = await User.findByPk(target_user_id, { transaction: t });

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    // 2️⃣ Prevent self-review
    if (actingUser.user_id === targetUser.user_id) {
      throw new Error("Self approval is not allowed");
    }

    // 3️⃣ Only ACTIVE users can review
    if (!actingUser.is_active) {
      throw new Error("Only active users can approve or reject accounts");
    }

    // 4️⃣ Prevent re-review of ACTIVE account
    if (targetUser.status === "ACTIVE") {
      throw new Error("User already approved");
    }

    // 5️⃣ Role-based approval rules (SOURCE OF TRUTH)
    const allowedApprovers = APPROVAL_RULES[targetUser.role_id] || [];

    if (!allowedApprovers.includes(actingUser.role_id)) {
      throw new Error("You are not authorized to review this account");
    }

    // 6️⃣ STRICT RULE
    // OWNER / ADMIN → ONLY ACTIVE ADMIN
    if (
      [ROLE.OWNER, ROLE.ADMIN].includes(targetUser.role_id) &&
      actingUser.role_id !== ROLE.ADMIN
    ) {
      throw new Error("Only active admin can review this account");
    }

    // 7️⃣ Create audit log (IMMUTABLE)
    const reviewLog = await AccountReviewLog.create(
      {
        target_user_id: targetUser.user_id,
        reviewed_by: actingUser.user_id,
        decision,
        reason
      },
      { transaction: t }
    );

    // 8️⃣ Update user account state
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
