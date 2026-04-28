module.exports = (sequelize, DataTypes) => {
  const NotificationLog = sequelize.define(
    "NotificationLog",
    {
      log_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: true
      },

      channel: {
        type: DataTypes.ENUM("EMAIL", "SMS", "PUSH"),
        allowNull: false
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false
      },

      status: {
        type: DataTypes.ENUM("PENDING", "SENT", "FAILED"),
        defaultValue: "PENDING"
      },

      error_message: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "notification_logs",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
      underscored: true
    }
  );

  return NotificationLog;
};