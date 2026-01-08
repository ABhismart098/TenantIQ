const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../../models");

const RegisterUserDTO = require("../../Src/dto/auth/register.dto");
const LoginRequestDTO = require("../../Src/dto/auth/login.dto");
const { createApprovalRequest } = require("../../services/approval/approval.helper");

/**
 * 🔐 REGISTER USER
 */
exports.registerUser = async (data) => {
  // 1️⃣ DTO mapping & validation
  const dto = new RegisterUserDTO(data);

  // 2️⃣ Check if user already exists
  const existingUser = await User.findOne({
    where: { email: dto.email }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 3️⃣ Validate role
  const role = await Role.findByPk(dto.role_id);
  if (!role) {
    throw new Error("Invalid role_id");
  }

  // 4️⃣ Hash password
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // 5️⃣ Create user
  const user = await User.create({
    full_name: dto.full_name,
    email: dto.email,
    phone: dto.phone,
    password_hash: hashedPassword,
    role_id: dto.role_id
  });
  // 2️⃣ Create approval request
  await createApprovalRequest(user);

  // 6️⃣ Remove sensitive data
  user.password_hash = undefined;

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
  // ✅ BUSINESS RULE HERE
  if (!user.is_active) {
    throw new Error("Account is not active");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.Role.role_name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      role: user.Role.role_name
    }
  };
};
