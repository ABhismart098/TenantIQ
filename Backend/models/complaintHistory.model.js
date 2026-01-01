module.exports = (sequelize, DataTypes) => {
  const ComplaintHistory = sequelize.define(
    "ComplaintHistory",
    {
      history_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      from_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      to_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: "complaint_history",
      timestamps: false
    },
    {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
}

  );

  return ComplaintHistory;
};
