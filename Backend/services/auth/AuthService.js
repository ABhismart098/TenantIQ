const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  User,
  Role,
  PasswordResetToken,
  sequelize,
} = require("../../models");

const RegisterUserDTO = require("../src/dto/auth/register.dto");
const LoginRequestDTO = require("../src/dto/auth/login.dto");
const notificationService = require("../../notification/notification.service");

/* ================= FORGOT PASSWORD ================= */

exports.forgotPassword = async (dto) => {
  const user = await User.findOne({ where: { email: dto.email } });

  // Silent return (security best practice)
  if (!user) return;

  if (user.status !== "ACTIVE" || !user.is_active) {
    throw new Error("User not eligible");
  }

  const rawToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await sequelize.transaction(async (t) => {

    // ✅ FIRST: invalidate old tokens
    await PasswordResetToken.update(
      { used: true },
      { where: { user_id: user.user_id }, transaction: t }
    );

    // ✅ THEN: create new token
    await PasswordResetToken.create(
      {
        user_id: user.user_id,
        token_hash: tokenHash,
        expires_at: expiresAt,
        used: false,
      },
      { transaction: t }
    );
  });

  // ✅ send raw token (NOT hash)
  await notificationService.sendEmail({
    to: user.email,
    subject: "Reset Password",
    template: "reset-password",
    user_id: user.user_id,
    data: {
      reset_link: `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`,
    },
  });
};

/* ================= RESET PASSWORD ================= */

exports.resetPassword = async (dto) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(dto.token)
    .digest("hex");

  const record = await PasswordResetToken.findOne({
    where: {
      token_hash: hashedToken,
      used: false,
    },
  });

  if (!record) throw new Error("Invalid token");

  if (record.expires_at < new Date()) {
    throw new Error("Token expired");
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  await sequelize.transaction(async (t) => {

    await User.update(
      { password_hash: hashedPassword },
      { where: { user_id: record.user_id }, transaction: t }
    );

    await record.update({ used: true }, { transaction: t });
  });
};

/* ================= REGISTER ================= */

exports.registerUser = async (data) => {
  const dto = new RegisterUserDTO(data);

  const existingUser = await User.findOne({
    where: { email: dto.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const role = await Role.findByPk(dto.role_id);
  if (!role) {
    throw new Error("Invalid role_id");
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = await User.create({
    full_name: dto.full_name,
    email: dto.email,
    phone: dto.phone,
    password_hash: hashedPassword,
    role_id: dto.role_id,
    is_active: false,
    status: "PENDING",
  });

  return user;
};

/* ================= LOGIN ================= */

exports.loginUser = async (data) => {
  const dto = new LoginRequestDTO(data);

  const user = await User.findOne({
    where: { email: dto.email },
    include: [{ model: Role }],
  });

  if (!user) throw new Error("Invalid email or password");

  const isValid = await bcrypt.compare(dto.password, user.password_hash);
  if (!isValid) throw new Error("Invalid email or password");

  if (!user.is_active) {
    throw new Error("Account not approved");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("Account not approved");
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      role_id: user.role_id,
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
      role: user.Role?.role_name,
    },
  };
};
