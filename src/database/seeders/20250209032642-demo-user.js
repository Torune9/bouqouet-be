"use strict";

const {encryptPassword} = require('../../services/utils/validatePassword')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: 'admin',
          email: 'admin@mail.com',
          password: encryptPassword('admin1234'),
          roleId: Sequelize.literal('gen_random_uuid()'),
          createdAt : new Date(),
          updatedAt : new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
