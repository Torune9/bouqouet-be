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
    static associate({Category,Order,OrderItem}) {
      
      this.belongsTo(Category,{
        foreignKey : 'categoryId'
      })

      this.belongsToMany(Order,{
        through : OrderItem,
        foreignKey : 'bouqouetId'
      })
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
    paranoid : true,
    modelName: 'Bouqouet',
  });
  return Bouqouet;
};