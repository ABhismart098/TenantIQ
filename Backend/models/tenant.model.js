module.exports = (sequelize, DataTypes) => {
return sequelize.define("Tenant", {
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
userId: { type: DataTypes.UUID, allowNull: false },
propertyId: { type: DataTypes.UUID, allowNull: false },
fullName: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true },
phone: { type: DataTypes.STRING },
permanentAddress: { type: DataTypes.TEXT },
currentAddress: { type: DataTypes.TEXT },
occupation: { type: DataTypes.STRING },
familyMembers: { type: DataTypes.INTEGER },

});
};