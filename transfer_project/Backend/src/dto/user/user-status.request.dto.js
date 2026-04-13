const { isUUID } = require("validator");

class UserStatusRequestDTO {
  constructor({ action, reason }, targetUserId, actingUserId) {

    if (!targetUserId) {
      throw new Error("target_user_id is required");
    }

    if (!isUUID(targetUserId)) {
      throw new Error("Invalid target_user_id");
    }

    if (!action) {
      throw new Error("action is required");
    }

    const normalizedAction = action.toUpperCase();

    const allowedActions = ["ENABLED", "DISABLED"];
    if (!allowedActions.includes(normalizedAction)) {
      throw new Error("Action must be ENABLED or DISABLED");
    }

    if (targetUserId === actingUserId) {
      throw new Error("You cannot change your own account status");
    }

    if (reason && reason.length > 255) {
      throw new Error("Reason cannot exceed 255 characters");
    }

    this.target_user_id = targetUserId;
    this.action = normalizedAction;
    this.reason = reason || null;

    Object.freeze(this); // 🔒 immutable DTO
  }
}

module.exports = UserStatusRequestDTO;
