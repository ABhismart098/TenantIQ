const bcrypt = require("bcryptjs");
const { User, PasswordResetToken, sequelize } = require("../../models");
const { hashToken } = require("../../utils/crypto.util");

exports.resetPassword = async (dto) => {
  const { token, new_password } = dto;

  const tokenHash = hashToken(token);

  const resetRecord = await PasswordResetToken.findOne({
    where: {
      token_hash: tokenHash,
      used_at: null
    }
  });

  if (!resetRecord) {
    throw new Error("Invalid or expired token");
  }

  if (resetRecord.expires_at < new Date()) {
    throw new Error("Token expired");
  }

  return sequelize.transaction(async (t) => {
    const hashedPassword = await bcrypt.hash(new_password, 12);

    await User.update(
      { password: hashedPassword },
      { where: { user_id: resetRecord.user_id }, transaction: t }
    );

    await resetRecord.update(
      { used_at: new Date() },
      { transaction: t }
    );
  });
};
