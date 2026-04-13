const approvalService = require("../../services/approval/approval.service");
const ApproveRequestDTO = require("../dto/approval/approve-request.dto");
const approvalHelper = require("../../services/approval/approval.helper");

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



/**
 * GET /api/approve/pending
 * Role-based pending approval list
 */
exports.listPendingApprovals = async (req, res) => {
  try {
    // 1️⃣ Authentication guard
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    // 2️⃣ Call helper (rule-based)
    const pendingApprovals =
      await approvalHelper.getPendingApprovals(req.user);

    // 3️⃣ Success response
    return res.status(200).json({
      success: true,
      total: pendingApprovals.length,
      data: pendingApprovals
    });

  } catch (err) {
    // 4️⃣ Business-rule errors (inactive / forbidden)
    return res.status(403).json({
      success: false,
      message: err.message
    });
  }
};
