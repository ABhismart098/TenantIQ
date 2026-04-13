module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      property_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      property_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      owner_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: "properties"
    },
    {
      createdAt: "created_at",   // ✅ CRITICAL FIX
      updatedAt: "updated_at",   // ✅ CRITICAL FIX

      underscored: true
        
}

  );

  return Property;
};
