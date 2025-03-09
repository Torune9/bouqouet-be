"use strict";

const { encryptPassword } = require("../../services/utils/validatePassword");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Roles";`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roleMap = {};
    roles.forEach((role) => {
      roleMap[role.name] = role.id;
    });

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "super admin",
          email: "superadmin@mail.com",
          password: encryptPassword("admin1234"),
          roleId: roleMap["super admin"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "admin",
          email: "admin@mail.com",
          password: encryptPassword("admin1234"),
          roleId: roleMap["admin"],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
