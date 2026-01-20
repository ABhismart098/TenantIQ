module.exports = (sequelize, DataTypes) => {
  const UserStatusLog = sequelize.define(
    "UserStatusLog",
    {
      log_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      target_user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      performed_by: {
        type: DataTypes.UUID,
        allowNull: false
      },

      action: {
        type: DataTypes.ENUM("ENABLED", "DISABLED"),
        allowNull: false
      },

      reason: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "user_status_logs",

      // 🔑 Audit table: insert-only
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,

      underscored: true
    }
  );

  return UserStatusLog;
};
