const { Role } = require("../../models");

module.exports = async () => {
  const roles = [
    { id: 1, name: "ADMIN" },
    { id: 2, name: "TENANT" },
    { id: 3, name: "PROPERTY_MANAGER" },
    { id: 4, name: "OWNER" }
  ];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { id: role.id },
      defaults: role
    });
  }

  console.log("✅ Roles seeded successfully");
};
