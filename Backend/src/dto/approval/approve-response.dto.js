const { isUUID } = require("validator");

class ApproveRequestDTO {
  constructor({ target_user_id, decision, reason }) {

    // 1️⃣ Required field checks
    if (!target_user_id) {
      throw new Error("target_user_id is required");
    }

    if (!decision) {
      throw new Error("decision is required");
    }

    // 2️⃣ UUID validation
    if (!isUUID(target_user_id)) {
      throw new Error("Invalid target_user_id format");
    }

    // 3️⃣ Decision validation (matches Sequelize ENUM)
    const allowedDecisions = ["APPROVED", "REJECTED"];
    if (!allowedDecisions.includes(decision)) {
      throw new Error("decision must be APPROVED or REJECTED");
    }

    // 4️⃣ Reason validation (optional)
    if (reason && reason.length > 500) {
      throw new Error("Reason cannot exceed 500 characters");
    }

    // 5️⃣ Assign sanitized values
    this.target_user_id = target_user_id;
    this.decision = decision;
    this.reason = reason || null;
  }
}

module.exports = ApproveRequestDTO;
