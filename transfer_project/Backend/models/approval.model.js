module.exports = (sequelize, DataTypes) => {
  const AccountReviewLog = sequelize.define(
    "AccountReviewLog",
    {
      review_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      target_user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      reviewed_by: {
        type: DataTypes.UUID,
        allowNull: false
      },

      decision: {
        type: DataTypes.ENUM("APPROVED", "REJECTED"),
        allowNull: false
      },

      reason: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: "accounts_review_logs",

      // ✅ table has ONLY created_at
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,

      underscored: true
    }
  );

  return AccountReviewLog;
};
