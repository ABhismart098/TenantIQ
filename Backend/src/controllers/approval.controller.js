const approvalService = require("../../services/approval/approval.service");
const ApproveRequestDTO = require("../dto/approval/approve-request.dto");

exports.approveUser = async (req, res) => {
  try {
    const dto = new ApproveRequestDTO(req.body);
    const result = await approvalService.processApproval(req.user, dto);

    res.json({
      success: true,
      message: "Approval processed successfully",
      data: result
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
};

exports.listPendingApprovals = async (req, res) => {
  try {
    const approvals = await approvalService.getPendingApprovals(req.user);

    res.json({
      success: true,
      data: approvals
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
};