const bcrypt = require("bcryptjs");
const { User, Role } = require("../../models");
const RegisterUserDTO = require("../../Src/dto/auth/register.dto");

exports.registerUser = async (data) => {
  // 1️⃣ DTO validation / mapping
  const dto = new RegisterUserDTO(data);

  // 2️⃣ Check if user already exists
  const existingUser = await User.findOne({
    where: { email: dto.email }
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 3️⃣ 🔥 ROLE VALIDATION (ADD HERE)
  const role = await Role.findByPk(dto.role_id);

  if (!role) {
    throw new Error("Invalid role_id");
  }

  // 4️⃣ Hash password (FIXED)
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // 5️⃣ Create user
  const user = await User.create({
    full_name: dto.full_name,
    email: dto.email,
    phone: dto.phone,
    password_hash: hashedPassword,
    role_id: dto.role_id
  });

  return user;
};
