const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Token presence check
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization token missing"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2️⃣ Verify JWT
    const decoded = verifyToken(token);
    console.log("DECODED TOKEN:", decoded);

    // ✅ FIX: match JWT payload key
    const user = await User.findOne({
      where: { user_id: decoded.user_id }
    });

    // 3️⃣ User existence
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // 4️⃣ Active check (industry standard)
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Your account is not active"
      });
    }

    // 5️⃣ Attach COMPLETE & SAFE context
    req.user = {
  user_id: user.user_id,
  role_id: user.role_id,
  email: user.email,
  is_active: user.is_active
};


    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: error.name === "TokenExpiredError"
        ? "Token expired, login again"
        : "Invalid token"
    });
  }
};
