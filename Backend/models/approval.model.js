module.exports = (sequelize, DataTypes) => {
  const Approval = sequelize.define("Approval", {
    approval_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    target_user_id: DataTypes.UUID,
    approved_by: DataTypes.UUID,
    action: DataTypes.STRING,
    reason: DataTypes.TEXT
  }, {
    tableName: "approvals",
    underscored: true
  });

  return Approval;
};
