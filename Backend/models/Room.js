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
  createdAt: "created_at",   // ✅ CRITICAL FIX
      updatedAt: "updated_at",   // ✅ CRITICAL FIX

      underscored: true
    
}

  );

  return Room;
};
