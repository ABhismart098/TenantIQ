"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("users");
    if (!table.is_active) {
      await queryInterface.addColumn("users", "is_active", {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable("users");
    if (table.is_active) await queryInterface.removeColumn("users", "is_active");
  }
};
