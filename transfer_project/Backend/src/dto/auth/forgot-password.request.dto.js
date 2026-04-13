// dto/auth/forgot-password.request.dto.js
class ForgotPasswordRequestDTO {
  constructor({ email }) {
    this.email = email;
  }
}

module.exports = ForgotPasswordRequestDTO;
