module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM("PENDING", "ACTIVE", "SUSPENDED", "REJECTED"),
        defaultValue: "PENDING"
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  return User;
};
