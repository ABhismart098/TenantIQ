const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tenantiq_secret_key";
const expiresIn = process.env.JWT_EXPIRES_IN || "1d"

exports.generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, expiresIn);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, expiresIn);
};
