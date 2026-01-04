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
  
  createdAt: "created_at",   // ✅ CRITICAL FIX
      updatedAt: "updated_at",   // ✅ CRITICAL FIX

      underscored: true
    
}

  );

  return Role;
};
