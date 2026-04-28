class ResetPasswordDTO {
  constructor({ token, password }) {
    if (!token) throw new Error("Token required");
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    this.token = token;
    this.password = password;
  }
}

module.exports = ResetPasswordDTO;