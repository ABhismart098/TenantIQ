class ApprovalResponseDTO {
  constructor(approval) {
    this.approval_id = approval.approval_id;
    this.status = approval.status;
    this.remark = approval.remark;
    this.updated_at = approval.updated_at;
  }
}

module.exports = ApprovalResponseDTO;
