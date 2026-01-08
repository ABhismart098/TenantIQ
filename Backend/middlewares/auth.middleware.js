const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    const user = await User.findOne({
      where: { user_id: decoded.user_id }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your account is not active"
      });
    }

    req.user = {
      user_id: user.user_id,
      role_id: user.role_id,
      email: user.email
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired"
    });
  }
};
