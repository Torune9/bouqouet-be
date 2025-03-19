'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageBouquet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Bouquet}) {
      this.belongsTo(Bouquet,{
        foreignKey : 'bouquetId',
        onDelete : 'CASCADE'
      })
    }
  }
  ImageBouquet.init({
    bouquetId: DataTypes.UUID,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageBouquet',
  });
  return ImageBouquet;
};