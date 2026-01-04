const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing or invalid"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = {
      user_id: decoded.id,
      role_id: decoded.role_id
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired"
    });
  }
};
