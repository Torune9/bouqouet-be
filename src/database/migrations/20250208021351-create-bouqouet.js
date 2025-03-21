'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bouquets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue : Sequelize.literal('gen_random_uuid()')
      },
      name: {
        type: Sequelize.STRING(200)
      },
      price: {
        type: Sequelize.BIGINT
      },
      stock: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull : true,
        references : {
          model : "Categories",
          key: 'id'
        },
        onDelete : 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        allowNull : true,
        type : Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bouquets');
  }
};