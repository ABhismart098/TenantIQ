// models/resetPassword.model.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ResetPassword = sequelize.define(
    "ResetPassword",
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

      reset_token: {
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
      tableName: "reset_passwords",
      timestamps: true
    }
  );

  return ResetPassword;
};
