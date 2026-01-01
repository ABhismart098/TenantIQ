const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../Src/config/db");

// Import models (FACTORY STYLE)
const Role = require("./Role")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);
const Property = require("./Property")(sequelize, DataTypes);
const Floor = require("./Floor")(sequelize, DataTypes);
const Room = require("./Room")(sequelize, DataTypes);
const Bed = require("./Bed")(sequelize, DataTypes);
const Complaint = require("./Complaint")(sequelize, DataTypes);
const ComplaintHistory = require("./complaintHistory.model")(sequelize, DataTypes);
const Comment = require("./comment.model")(sequelize, DataTypes);
const Approval = require("./approval.model")(sequelize, DataTypes);
const Notification = require("./notification.model")(sequelize, DataTypes);

/* ===================== ASSOCIATIONS ===================== */

// Roles & Users
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id" });

// Owner → Properties
User.hasMany(Property, { foreignKey: "owner_id" });
Property.belongsTo(User, { foreignKey: "owner_id" });

// Property hierarchy
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

// Approvals
User.hasMany(Approval, { foreignKey: "requested_user_id" });
Approval.belongsTo(User, { foreignKey: "requested_user_id" });

// Notifications
User.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(User, { foreignKey: "user_id" });

/* ===================== EXPORT ===================== */
module.exports = {
  sequelize,
  Sequelize,
  Role,
  User,
  Property,
  Floor,
  Room,
  Bed,
  Complaint,
  ComplaintHistory,
  Comment,
  Approval,
  Notification
};
