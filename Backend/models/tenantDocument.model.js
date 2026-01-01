module.exports = (sequelize, DataTypes) => {
return sequelize.define("TenantDocument", {
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
tenantId: { type: DataTypes.UUID, allowNull: false },
documentType: { type: DataTypes.ENUM("AADHAR", "PAN", "PASSPORT", "AGREEMENT", "OTHER"), allowNull: false },
documentNumber: { type: DataTypes.STRING },
documentUrl: { type: DataTypes.STRING, allowNull: false },
uploadedBy: { type: DataTypes.ENUM("ADMIN", "OWNER", "PROPERTY_MANAGER"), allowNull: false },
isSensitive: { type: DataTypes.BOOLEAN, defaultValue: true },
});
};