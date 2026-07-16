"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      INSERT INTO roles (role_id, role_name, created_at, updated_at)
      VALUES
        (1, 'ADMIN', NOW(), NOW()),
        (2, 'TENANT', NOW(), NOW()),
        (3, 'PROPERTY_MANAGER', NOW(), NOW()),
        (4, 'OWNER', NOW(), NOW())
      ON CONFLICT (role_id) DO UPDATE SET
        role_name = EXCLUDED.role_name,
        updated_at = EXCLUDED.updated_at;
    `);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("roles", {
      role_id: [1, 2, 3, 4]
    });
  }
};
