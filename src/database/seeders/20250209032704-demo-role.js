"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name : 'super admin',
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : 'admin',
          createdAt : new Date(),
          updatedAt : new Date(),
        },
        {
          name : 'user',
          createdAt : new Date(),
          updatedAt : new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
     await queryInterface.bulkDelete('Roles', null, {});
  },
};
