module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: "comments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true
    }
  );

  return Comment;
};
