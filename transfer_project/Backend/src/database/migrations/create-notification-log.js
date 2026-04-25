"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // ENUMS (safe create)
    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_notification_logs_channel" AS ENUM ('EMAIL', 'SMS', 'PUSH');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.sequelize.query(`
      DO $$ BEGIN
        CREATE TYPE "enum_notification_logs_status" AS ENUM ('PENDING', 'SENT', 'FAILED');
      EXCEPTION WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryInterface.createTable("notification_logs", {
      log_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      channel: {
        type: Sequelize.ENUM("EMAIL", "SMS", "PUSH"),
        allowNull: false
      },

      type: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM("PENDING", "SENT", "FAILED"),
        defaultValue: "PENDING"
      },

      error_message: {
        type: Sequelize.TEXT
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex("notification_logs", ["user_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notification_logs");

    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_notification_logs_channel";`);
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_notification_logs_status";`);
  }
};