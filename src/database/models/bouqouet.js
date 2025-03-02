'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bouqouet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bouqouet.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    stock: DataTypes.INTEGER,
    image: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.TEXT,
    categoryId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Bouqouet',
  });
  return Bouqouet;
};