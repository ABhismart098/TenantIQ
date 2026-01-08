class UserResponseDTO {
  constructor(user) {
    this.user_id = user.user_id;
    this.full_name = user.full_name;
    this.email = user.email;
    this.role_id = user.role_id;
    this.status = user.status;
    this.created_at = user.created_at;
    
  }
}

module.exports = UserResponseDTO;
