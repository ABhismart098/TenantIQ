const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../src/config/db");

/* ===================== LOAD MODELS ===================== */

// Core
const Role = require("./Role")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);

// ✅ Make sure file name EXACTLY matches
const PasswordResetToken = require("./passwordResetToken.model")(sequelize, DataTypes);

// Property
const Property = require("./Property")(sequelize, DataTypes);
const Floor = require("./Floor")(sequelize, DataTypes);
const Room = require("./Room")(sequelize, DataTypes);
const Bed = require("./Bed")(sequelize, DataTypes);

// Complaint
const Complaint = require("./Complaint")(sequelize, DataTypes);
const ComplaintHistory = require("./complaintHistory.model")(sequelize, DataTypes);
const Comment = require("./comment.model")(sequelize, DataTypes);

// Approval / Status
const AccountReviewLog = require("./approval.model")(sequelize, DataTypes);
const UserStatusLog = require("./userStatusLog.model")(sequelize, DataTypes);

// Notification
const Notification = require("./notification.model")(sequelize, DataTypes);
const NotificationLog = require("./NotificationLog.model")(sequelize, DataTypes);

/* ===================== ASSOCIATIONS ===================== */

// Role ↔ User
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// Property
User.hasMany(Property, { foreignKey: "owner_id" });
Property.belongsTo(User, { foreignKey: "owner_id" });

// Hierarchy
Property.hasMany(Floor, { foreignKey: "property_id" });
Floor.belongsTo(Property, { foreignKey: "property_id" });

Floor.hasMany(Room, { foreignKey: "floor_id" });
Room.belongsTo(Floor, { foreignKey: "floor_id" });

Room.hasMany(Bed, { foreignKey: "room_id" });
Bed.belongsTo(Room, { foreignKey: "room_id" });

// Complaints
User.hasMany(Complaint, { foreignKey: "tenant_id" });
Complaint.belongsTo(User, { foreignKey: "tenant_id" });

Property.hasMany(Complaint, { foreignKey: "property_id" });
Complaint.belongsTo(Property, { foreignKey: "property_id" });

// Complaint History
Complaint.hasMany(ComplaintHistory, { foreignKey: "complaint_id" });
ComplaintHistory.belongsTo(Complaint, { foreignKey: "complaint_id" });

// Comments
Complaint.hasMany(Comment, { foreignKey: "complaint_id" });
Comment.belongsTo(Complaint, { foreignKey: "complaint_id" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

// Approval logs
User.hasMany(AccountReviewLog, {
  foreignKey: "target_user_id",
  as: "receivedReviews"
});

User.hasMany(AccountReviewLog, {
  foreignKey: "reviewed_by",
  as: "performedReviews"
});

AccountReviewLog.belongsTo(User, {
  foreignKey: "target_user_id",
  as: "targetUser"
});

AccountReviewLog.belongsTo(User, {
  foreignKey: "reviewed_by",
  as: "reviewer"
});

// Status logs
User.hasMany(UserStatusLog, {
  foreignKey: "target_user_id",
  as: "statusChanges"
});

UserStatusLog.belongsTo(User, {
  foreignKey: "target_user_id",
  as: "targetUser"
});

UserStatusLog.belongsTo(User, {
  foreignKey: "performed_by",
  as: "performedBy"
});

// Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

// Reset tokens
User.hasMany(PasswordResetToken, { foreignKey: "user_id" });
PasswordResetToken.belongsTo(User, { foreignKey: "user_id" });

/* ===================== EXPORT ===================== */

module.exports = {
  sequelize,
  Sequelize, // ✅ IMPORTANT

  Role,
  User,
  PasswordResetToken,

  Property,
  Floor,
  Room,
  Bed,

  Complaint,
  ComplaintHistory,
  Comment,

  AccountReviewLog,
  UserStatusLog,
  Notification
  ,
  NotificationLog
};
