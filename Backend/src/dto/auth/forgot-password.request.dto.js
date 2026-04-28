class ForgotPasswordDTO {
  constructor({ email }) {
    if (!email) throw new Error("Email is required");

    this.email = email.toLowerCase();
  }
}

module.exports = ForgotPasswordDTO;