const { isUUID } = require("validator");

class ApproveRequestDTO {
  constructor({ target_user_id, action, reason }) {
    // 1️⃣ Required field checks
    if (!target_user_id) {
      throw new Error("target_user_id is required");
    }

    if (!action) {
      throw new Error("action is required");
    }

    // 2️⃣ UUID validation
    if (!isUUID(target_user_id)) {
      throw new Error("Invalid target_user_id format");
    }

    // 3️⃣ Action validation
    const allowedActions = ["APPROVED", "REJECTED"];
    if (!allowedActions.includes(action)) {
      throw new Error("Action must be APPROVED or REJECTED");
    }

    // 4️⃣ Reason validation (optional but controlled)
    if (reason && reason.length > 500) {
      throw new Error("Reason cannot exceed 500 characters");
    }

    // 5️⃣ Assign sanitized values
    this.target_user_id = target_user_id;
    this.action = action;
    this.reason = reason || null;
  }
}

module.exports = ApproveRequestDTO;
