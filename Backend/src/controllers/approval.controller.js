const approvalService = require("../../services/approval/approval.service");
const ApproveRequestDTO = require("../dto/approval/approve-request.dto");

exports.approveUser = async (req, res) => {
  try {
    const dto = new ApproveRequestDTO(req.body);
    const result = await approvalService.processApproval(req.user, dto);

    let message;
    if (result.decision === "APPROVED") {
      message = "User approved successfully";
    } else if (result.decision === "REJECTED") {
      message = "User rejected successfully";
    } else {
      message = "Approval processed successfully";
    }

    res.json({
      success: true,
      message,
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
    const pending = await approvalService.getPendingApprovals(req.user);
    res.json({
      success: true,
      data: pending
    });
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
};
