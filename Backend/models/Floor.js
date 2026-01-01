module.exports = (sequelize, DataTypes) => {
  const Floor = sequelize.define(
    "Floor",
    {
      floor_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      floor_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      property_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: "floors"
    },
    {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
}

  );

  return Floor;
};
