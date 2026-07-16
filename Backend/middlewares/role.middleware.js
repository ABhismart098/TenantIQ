module.exports = (...allowedRoleIds) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (!req.user.role_id) {
      return res.status(401).json({
        success: false,
        message: "Role data missing"
      });
    }

    const userRole = Number(req.user.role_id);
    const allowed = allowedRoleIds.map(Number);

    if (!allowed.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

    next();
  };
};
