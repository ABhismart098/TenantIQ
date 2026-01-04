class RegisterUserDTO {
  constructor(body) {
    this.full_name = body.full_name;
    this.email = body.email;
    this.phone = body.phone || null;
    this.password = body.password;
    this.role_id = body.role_id;
  }
}

module.exports = RegisterUserDTO;
