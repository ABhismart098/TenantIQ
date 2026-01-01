module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: "roles",
      timestamps: true
    },
    {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
}

  );

  return Role;
};
