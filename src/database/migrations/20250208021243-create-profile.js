"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Profiles", {
            id: {
                allowNull: false,
                primaryKey : true,
                type: Sequelize.UUID,
                defaultValue : Sequelize.literal('gen_random_uuid()')
            },
            userId: {
                allowNull: true,
                unique : true,
                type: Sequelize.UUID,
            },
            firstName: {
                type: Sequelize.STRING(100),
            },
            lastName: {
                type: Sequelize.STRING(100),
            },
            image: {
                type: Sequelize.STRING,
                allowNull : true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Profiles");
    },
};
