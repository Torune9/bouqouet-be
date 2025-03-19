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
          bouquetId: bouquet.id,
          path: `https://placehold.co/${faker.number.int({ min: 400, max: 800 })}x${faker.number.int({ min: 400, max: 800 })}`, 
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('ImageBouquets', imageBouquetsData, {});
    console.log('Seeder ImageBouquets berhasil dijalankan.');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ImageBouquets', null, {});
    console.log('Seeder ImageBouquets berhasil dihapus.');
  }
};
