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
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
}
,
    {
      tableName: "approvals",
      timestamps: true // tracks createdAt/updatedAt
    },
    
  );

  return Approval;
};
