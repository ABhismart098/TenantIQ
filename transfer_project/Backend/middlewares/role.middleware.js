/**
 * Role-based access control (RBAC) middleware
 *
 * Usage:
 *   roleGuard(ROLE.ADMIN, ROLE.OWNER)
 *
 * This middleware must be used AFTER auth.middleware
 */
module.exports = (...allowedRoleIds) => {
  return (req, res, next) => {
    // 1️⃣ Ensure authentication middleware ran
    if (!req.user || !req.user.role_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: role information missing"
      });
    }

    // 2️⃣ Role authorization check
    if (!allowedRoleIds.includes(req.user.role_id)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};
