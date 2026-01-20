exports.userStatusRequestDTO = (body) => {
  if (!body.target_user_id) {
    throw new Error("target_user_id is required");
  }

  if (typeof body.is_active !== "boolean") {
    throw new Error("is_active must be boolean");
  }

  return {
    target_user_id: body.target_user_id,
    is_active: body.is_active,
    reason: body.reason || null
  };
};
