const authService = require("../../services/auth/AuthService");
const RegisterRequestDTO = require("../dto/auth/register.dto");
const LoginRequestDTO = require("../dto/auth/login.dto");
const UserResponseDTO = require("../dto/auth/user.response.dto");

exports.register = async (req, res) => {
  try {
    const dto = new RegisterRequestDTO(req.body);
    const user = await authService.registerUser(dto);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: new UserResponseDTO(user)
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const dto = new LoginRequestDTO(req.body);
    const result = await authService.loginUser(dto);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};
