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
        allowNull: false,
        unique: true
      },
      phone: DataTypes.STRING,
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("PENDING", "ACTIVE", "SUSPENDED", "REJECTED"),
        defaultValue: "PENDING"
      }
    },
    {
      tableName: "users",
      createdAt: "created_at",   // ✅ CRITICAL FIX
      updatedAt: "updated_at",   // ✅ CRITICAL FIX

      underscored: true
    }
  );

  return User;
};
