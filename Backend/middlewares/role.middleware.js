module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role_id) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission"
      });
    }

    next();
  };
};
