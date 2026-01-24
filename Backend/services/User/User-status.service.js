const {User, UserStatusLog, sequelize} = require("../../models");

const { canActOnUser} = require("../../utils/role-permission");


exports.updateUserStatus = async (actingUser, dto) => {
  const { target_user_id, action, reason } = dto;
  const is_active = action === "ENABLED";

  const targetUser = await User.findByPk(target_user_id);
  if (!targetUser) throw new Error("Target user not found");

  canActOnUser(actingUser, targetUser);

  return sequelize.transaction(async (t) => {
    await targetUser.update({ is_active }, { transaction: t });

    const log = await UserStatusLog.create(
      {
        target_user_id,
        performed_by: actingUser.user_id,
        action,
        reason
      },
      { transaction: t }
    );

    return {
      user_id: targetUser.user_id,
      status: action,
      log_id: log.log_id
    };
  });
};
