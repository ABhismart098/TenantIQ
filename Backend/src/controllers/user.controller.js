const UserStatusDTO = require("../dto/user/user-status.request.dto");
const userStatusService = require("../../services/User/User-status.service");

/**
 * PATCH /api/users/status
 * Enable / Disable user account
 */
exports.updateUserStatus = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const dto = new UserStatusDTO(req.body);

    const result = await userStatusService.updateUserStatus(
      req.user,
      dto
    );

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result
    });

  } catch (err) {
    return res.status(403).json({
      success: false,
      message: err.message
    });
  }
};
