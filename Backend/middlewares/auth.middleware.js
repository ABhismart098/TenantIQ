const { verifyToken } = require("../utils/jwt");
const { User, Role } = require("../models");

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

 // ✅ INCLUDE ROLE
 const user = await User.findByPk(decoded.user_id, {
 include: [{ model: Role, attributes: ["role_id", "role_name"] }]
 });

 if (!user) {
 return res.status(401).json({
 success: false,
 message: "User not found"
 });
 }

 if (!user.is_active || user.status !== "ACTIVE") {
 return res.status(403).json({ success: false, message: "Your account is not active" });
 }

 // ✅ FIXED req.user
 req.user = {
 user_id: user.user_id,
 role_id: user.role_id,
 role_name: user.Role?.role_name, // 🔥 IMPORTANT
 is_active: user.is_active
 };

 next();

 } catch (error) {
 return res.status(401).json({
 success: false,
 message: error.name === "TokenExpiredError" ? "Token expired, login again" : "Invalid token"
 });
 }
};
