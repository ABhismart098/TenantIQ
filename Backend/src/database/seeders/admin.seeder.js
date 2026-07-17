"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME = "TenantIQ Admin" } = process.env;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.log("Skipping admin bootstrap: ADMIN_EMAIL and ADMIN_PASSWORD are not set.");
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await queryInterface.sequelize.query(
      `INSERT INTO users
        (user_id, full_name, email, password_hash, role_id, status, is_active, created_at, updated_at)
       VALUES (gen_random_uuid(), :fullName, :email, :passwordHash, 1, 'ACTIVE', true, NOW(), NOW())
       ON CONFLICT (email) DO UPDATE SET
         full_name = EXCLUDED.full_name,
         password_hash = EXCLUDED.password_hash,
         role_id = 1,
         status = 'ACTIVE',
         is_active = true,
         updated_at = NOW();`,
      {
        replacements: {
          fullName: ADMIN_NAME,
          email: ADMIN_EMAIL.toLowerCase(),
          passwordHash
        }
      }
    );
  },

  async down(queryInterface) {
    if (process.env.ADMIN_EMAIL) {
      await queryInterface.bulkDelete("users", {
        email: process.env.ADMIN_EMAIL.toLowerCase()
      });
    }
  }
};
