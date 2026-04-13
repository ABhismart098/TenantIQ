module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define(
    "Complaint",
    {
      complaint_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM("OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"),
        defaultValue: "OPEN"
      },
      tenant_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      property_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      tableName: "complaints",
      timestamps: true
    },
    {
      createdAt: "created_at",   // ✅ CRITICAL FIX
      updatedAt: "updated_at",   // ✅ CRITICAL FIX

      underscored: true
        
}

  );

  return Complaint;
};
