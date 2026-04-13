const { User, PasswordResetToken, sequelize } = require("../../models");
const { generateResetToken, hashToken } = require("../../utils/crypto.util");
const { sendResetPasswordEmail } = require("../../utils/mailer.util");

exports.forgotPassword = async (dto) => {
  const { email } = dto;

  const user = await User.findOne({ where: { email } });

  // 🔐 SECURITY: Always return success
  if (!user) return;

  if (!user.is_active || !user.is_approved) {
    throw new Error("Account not eligible for password reset");
  }

  return sequelize.transaction(async (t) => {
    // Invalidate old tokens
    await PasswordResetToken.update(
      { used_at: new Date() },
      { where: { user_id: user.user_id }, transaction: t }
    );

    const rawToken = generateResetToken();
    const tokenHash = hashToken(rawToken);

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

    await PasswordResetToken.create(
      {
        user_id: user.user_id,
        token_hash: tokenHash,
        expires_at: expiresAt
      },
      { transaction: t }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

    await sendResetPasswordEmail(user.email, resetLink);
  });
};
