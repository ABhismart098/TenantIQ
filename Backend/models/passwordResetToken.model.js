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
      used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: "reset_password_tokens",
      // The migration creates an insert-only audit table with `created_at` only.
      timestamps: false,
      underscored: true
    }
  );

  return PasswordResetToken;
};
