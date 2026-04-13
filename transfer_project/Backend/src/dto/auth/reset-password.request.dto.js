// dto/auth/reset-password.request.dto.js
class ResetPasswordRequestDTO {
  constructor({ reset_token, new_password }) {
    this.reset_token = reset_token;
    this.new_password = new_password;
  }
}

module.exports = ResetPasswordRequestDTO;
