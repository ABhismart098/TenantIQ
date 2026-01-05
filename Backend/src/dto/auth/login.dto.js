/**
 * Login Request DTO
 * Purpose:
 * - Accept only required login fields
 * - Prevent extra/unwanted data from reaching service layer
 * - Acts as a contract between Controller → Service
 */
class LoginRequestDTO {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

module.exports = LoginRequestDTO;
