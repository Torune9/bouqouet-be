'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageBouqouet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Bouqouet}) {
      this.belongsTo(Bouqouet,{
        foreignKey : 'bouqouetId',
        onDelete : 'CASCADE'
      })
    }
  }
  ImageBouqouet.init({
    bouqouetId: DataTypes.UUID,
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageBouqouet',
  });
  return ImageBouqouet;
};