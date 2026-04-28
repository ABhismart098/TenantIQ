const crypto = require("crypto");

// 🔐 Generate raw token (send to user)
exports.generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// 🔒 Hash token (store in DB)
exports.hashToken = (token) => {
  if (!token) throw new Error("Token is required");
  return crypto.createHash("sha256").update(token).digest("hex");
};

// ⏳ Expiry helper
exports.getTokenExpiry = (minutes = 15) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};