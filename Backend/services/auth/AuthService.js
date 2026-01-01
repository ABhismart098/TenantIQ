const bcrypt = require("bcryptjs");
const { User } = require("../../models/index"); // MUST come from index.js
const { generateToken } = require("../../utils/jwt");

exports.registerUser = async (data) => {
  const { name, email, password, role_id } = data;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role_id
  });
  console.log(user);


  return user;
};

exports.loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user.id,
    role_id: user.role_id
  });

  return { user, token };
};
