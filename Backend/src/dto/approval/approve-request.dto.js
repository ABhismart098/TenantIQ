class ApproveRequestDTO {
  constructor({ target_user_id, action, reason }) {
    this.target_user_id = target_user_id;
    this.action = action;
    this.reason = reason;
  }
}

module.exports = ApproveRequestDTO;
