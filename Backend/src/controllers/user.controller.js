const UserStatusRequestDTO = require("../dto/user/user-status.request.dto");
const userStatusService = require("../../services/user/user-status.service");

exports.updateUserStatus = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const dto = new UserStatusRequestDTO(
      req.body,                     // { action, reason }
      req.params.target_user_id,    // URL param
      req.user.user_id              // acting user
    );

    const result = await userStatusService.updateUserStatus(req.user, dto);

    return res.status(200).json({
      success: true,
      message:
        result.status === "ENABLED"
          ? "User enabled successfully"
          : "User disabled successfully",
      data: result
    });

  } catch (err) {
    return res.status(403).json({
      success: false,
      message: err.message
    });
  }
};
