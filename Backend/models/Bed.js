module.exports = (sequelize, DataTypes) => {
  const Bed = sequelize.define(
    "Bed",
    {
      bed_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      bed_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      room_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: "beds"
    },
    {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
}
,
  );

  return Bed;
};
