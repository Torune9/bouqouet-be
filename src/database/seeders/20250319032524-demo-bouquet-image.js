const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const bouquets = await queryInterface.sequelize.query(
      'SELECT id FROM "Bouquets";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!bouquets.length) {
      console.log('Tidak ada data Bouquets untuk dihubungkan.');
      return;
    }

    const imageBouquetsData = [];

    bouquets.forEach((bouquet) => {
      const numberOfImages = faker.number.int({ min: 2, max: 5 });

      for (let i = 0; i < numberOfImages; i++) {
        imageBouquetsData.push({
          bouqouetId: bouquet.id,
          path: `https://placehold.co/${faker.number.int({ min: 400, max: 800 })}x${faker.number.int({ min: 400, max: 800 })}`, 
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('ImageBouqouets', imageBouquetsData, {});
    console.log('Seeder ImageBouqouets berhasil dijalankan.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ImageBouqouets', null, {});
    console.log('Seeder ImageBouqouets berhasil dihapus.');
  }
};
