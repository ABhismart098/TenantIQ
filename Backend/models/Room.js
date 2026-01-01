module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      room_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      room_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      floor_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: "rooms"
    },
    {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
}

  );

  return Room;
};
