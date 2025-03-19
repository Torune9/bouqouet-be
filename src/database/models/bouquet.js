'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bouquet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category,Order,OrderItem,ImageBouquet}) {
      
      this.belongsTo(Category,{
        foreignKey : 'categoryId'
      })

      this.belongsToMany(Order,{
        through : OrderItem,
        foreignKey : 'bouquetId'
      })
      this.hasMany(ImageBouquet,{
        foreignKey : 'bouquetId',
        onDelete : 'CASCADE'
      })
    }
  }
  Bouquet.init({
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    stock: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    categoryId: DataTypes.UUID
  }, {
    sequelize,
    paranoid : true,
    modelName: 'Bouquet',
  });
  return Bouquet;
};