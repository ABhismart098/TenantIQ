module.exports = (sequelize, DataTypes) => {
  const Approval = sequelize.define(
    "Approval",
    {
      approval_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING"
      }
    },
    {
      createdAt: "created_at",   // ✅ CRITICAL FIX
      updatedAt: "updated_at",   // ✅ CRITICAL FIX

      underscored: true
        
}
,
    {
      tableName: "approvals",
      timestamps: true // tracks createdAt/updatedAt
    },
    
  );

  return Approval;
};
