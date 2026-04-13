exports.userResponseDTO = (user) => ({
  user_id: user.user_id,
  full_name: user.full_name,
  email: user.email,
  role_id: user.role_id,
  status: user.status,
  is_active: user.is_active,
  created_at: user.created_at
});
