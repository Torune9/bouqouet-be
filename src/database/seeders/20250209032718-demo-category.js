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
      "Categories",
      [
        {
          name: "wangi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "elegant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "wisuda",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pemakaman",
          createdAt: new Date(),
          updatedAt: new Date(),
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
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
