module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    status: DataTypes.ENUM("PENDING", "ACTIVE", "SUSPENDED", "REJECTED"),
    is_active: DataTypes.BOOLEAN
  }, {
    tableName: "users",
    underscored: true
  });

  return User;
};
