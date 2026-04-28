const authService = require("../../services/auth/AuthService");
const RegisterRequestDTO = require("../../src/dto/auth/register.dto");
const LoginRequestDTO = require("../../src/dto/auth/login.dto");
const UserResponseDTO = require("../dto/Common/user.response.dto");


const ForgotPasswordDTO = require("../dto/auth/forgot-password.request.dto");
const ResetPasswordDTO = require("../dto/auth/reset-password.request.dto");



exports.forgotPassword = async (req, res) => {
  try {
    const dto = new ForgotPasswordDTO(req.body);

    await authService.forgotPassword(dto);

    return res.json({
      success: true,
      message: "If email exists, reset link sent"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const dto = new ResetPasswordDTO(req.body);

    await authService.resetPassword(dto);

    return res.json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.register = async (req, res) => {
  try {
    const dto = new RegisterRequestDTO(req.body);
    const user = await authService.registerUser(dto);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Awaiting approval",
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
