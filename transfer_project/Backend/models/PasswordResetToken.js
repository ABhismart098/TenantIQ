module.exports = (sequelize, DataTypes) => {
  const ResetPasswordToken = sequelize.define(
    "ResetPasswordToken",
    {
      reset_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      token_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },

      expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      },

      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: "reset_password_tokens",
      timestamps: true
    }
  );

  return ResetPasswordToken;
};