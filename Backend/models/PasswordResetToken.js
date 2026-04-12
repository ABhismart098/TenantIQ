module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define(
    "PasswordResetToken",
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

      used_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: "password_reset_tokens",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      underscored: true
    }
  );

  return PasswordResetToken;
};
