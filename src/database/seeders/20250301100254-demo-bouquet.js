// "use strict";
// const { faker } = require("@faker-js/faker");

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//     async up(queryInterface, Sequelize) {
//         /**
//          * Add seed commands here.
//          *
//          * Example:
//          *
//          */

//         const categories = await queryInterface.sequelize.query(
//             'SELECT id FROM "Categories";',
//             { type: queryInterface.sequelize.QueryTypes.SELECT }
//         );

//         let bouqouets = [];

//         for (let i = 0; i < 100; i++) {
//             let randomWidth = faker.number.int({ min: 400, max: 800 });
//             let randomHeight = faker.number.int({ min: 400, max: 800 });
//             bouqouets.push({
//                 name: faker.lorem.words(2),
//                 price: faker.number.bigInt({
//                   min : 20000,
//                   max : 500000
//                 }),
//                 stock: faker.number.int(100),
//                 image: [
//                     `https://placehold.co/${randomWidth}x${randomHeight}`,
//                     `https://placehold.co/${randomWidth}x${randomHeight}`,
//                     `https://placehold.co/${randomWidth}x${randomHeight}`,
//                     `https://placehold.co/${randomWidth}x${randomHeight}`,
//                     `https://placehold.co/${randomWidth}x${randomHeight}`
//                 ],
//                 description: faker.lorem.sentences(),
//                 categoryId: faker.helpers.arrayElement(categories).id,
//                 createdAt: faker.date.recent(),
//                 updatedAt: faker.date.recent(),
//             });
//         }
//         await queryInterface.bulkInsert("Bouqouets", bouqouets);
//     },

//     async down(queryInterface, Sequelize) {
//         /**
//          * Add commands to revert seed here.
//          *
//          * Example:
//          */
//         await queryInterface.bulkDelete("Bouqouets", null, {});
//     },
// };
