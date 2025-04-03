'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue : Sequelize.literal('gen_random_uuid()')
      },
      status: {
        type: Sequelize.STRING(50)
      },
      totalPrice: {
        type: Sequelize.BIGINT
      },
      userId: {
        type: Sequelize.UUID
      },
      addressId: {
        type: Sequelize.UUID
      },
      token : {
        type : Sequelize.STRING
      },
      midtransOrderId : {
        type : Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};