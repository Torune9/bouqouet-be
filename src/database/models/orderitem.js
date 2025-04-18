'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order,Bouquet}) {
      this.belongsTo(Order,{
        foreignKey : 'orderId'
      })
      this.belongsTo(Bouquet,{
        foreignKey : 'bouquetId'
      })
    }
  }
  OrderItem.init({
    orderId: DataTypes.UUID,
    bouquetId: DataTypes.UUID,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};