module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      notification_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
      ,
      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: "notifications",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true
    }
  );

  return Notification;
};
