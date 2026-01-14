const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check token presence
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

    // ✅ FIX: use decoded.id (must match JWT payload)
    const user = await User.findOne({
      where: { user_id: decoded.user_id }
    });

    // 3️⃣ User existence check
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

    // 5️⃣ Attach safe user context
    req.user = {
      user_id: user.user_id,
      role_id: User.role_id,
      email: user.email
    };

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message.includes("expired")
        ? "Token expired, login again"
        : "Invalid token"
    });
  }
};
