const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../../models");

const RegisterUserDTO = require("../../src/dto/auth/register.dto");
const LoginRequestDTO = require("../../src/dto/auth/login.dto");
const { createApprovalRequest } = require("../approval/approval.helper");

const crypto = require("crypto");


const {  ResetPasswordToken, sequelize } = require("../../models");
const notificationService = require("../../notification/notification.service");

exports.forgotPassword = async (dto) => {
  const user = await User.findOne({ where: { email: dto.email } });

  // 🔐 DO NOT reveal user existence
  if (!user) return;

  // ✅ FIX: use strict comparison + handle undefined safely
  if (user.status !== "ACTIVE" || !user.is_approved) {
    throw new Error("User not eligible");
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await sequelize.transaction(async (t) => {
    await ResetPasswordToken.update(
      { used: true },
      { where: { user_id: user.user_id }, transaction: t }
    );

    await ResetPasswordToken.create(
      {
        user_id: user.user_id,
        token_hash: tokenHash,
        expires_at: expiresAt
      },
      { transaction: t }
    );
  });

  // ✅ FIX: correct key name (must match email template)
  await notificationService.sendEmail({
    to: user.email,
    subject: "Reset Password",
    template: "reset-password",
    data: {
      reset_link: `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`
    }
  });
};


exports.resetPassword = async (dto) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(dto.token)
    .digest("hex");

  const record = await ResetPasswordToken.findOne({
    where: {
      token_hash: hashedToken,
      used: false
    }
  });

  if (!record) throw new Error("Invalid token");

  if (record.expires_at < new Date()) {
    throw new Error("Token expired");
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  await sequelize.transaction(async (t) => {
    await User.update(
      { password: hashedPassword },
      { where: { user_id: record.user_id }, transaction: t }
    );

    await record.update({ used: true }, { transaction: t });
  });
};
/**
 * 🔐 REGISTER USER
 */
exports.registerUser = async (data) => {
  const dto = new RegisterUserDTO(data);

  // Check existing user
  const existingUser = await User.findOne({
    where: { email: dto.email }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Validate role
  const role = await Role.findByPk(dto.role_id);
  if (!role) {
    throw new Error("Invalid role_id");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // Create user
  const user = await User.create({
    full_name: dto.full_name,
    email: dto.email,
    phone: dto.phone,
    password_hash: hashedPassword,
    role_id: dto.role_id,
    is_active: false, // 🔐 default
    status: "PENDING"
  });

  // Create approval request
  await createApprovalRequest({
    targetUserId: user.user_id,
    roleId: user.role_id
  });

  return user;
};

/**
 * 🔑 LOGIN USER
 */
exports.loginUser = async (data) => {
  const dto = new LoginRequestDTO(data);

  const user = await User.findOne({
    where: { email: dto.email },
    include: [{
      model: Role,
      attributes: ["role_id", "role_name"]
    }]
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    dto.password,
    user.password_hash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // 🔐 BUSINESS RULE
  if (!user.is_active) {
    throw new Error("Your account is not active. Await approval.");
  }

  // ✅ CONSISTENT JWT PAYLOAD
  const token = jwt.sign(
    {
      user_id: user.user_id,
      role_id: user.Role.role_name,
      user_satus: user.is_active
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.Role.role_name
    }
  };
};
