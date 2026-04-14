"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notification_logs", {
      log_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.UUID
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
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("notification_logs");
  }
};