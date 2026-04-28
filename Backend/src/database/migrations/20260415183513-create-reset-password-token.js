"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("reset_password_tokens", {
      reset_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",     // must match table name
          key: "user_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      token_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });

    // 🔹 Indexes (IMPORTANT for performance)
    await queryInterface.addIndex("reset_password_tokens", ["user_id"]);
    await queryInterface.addIndex("reset_password_tokens", ["token_hash"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reset_password_tokens");
  }
};


"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint("reset_password_tokens", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_reset_token_user",
      references: {
        table: "users",
        field: "user_id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint(
      "reset_password_tokens",
      "fk_reset_token_user"
    );

  }
};