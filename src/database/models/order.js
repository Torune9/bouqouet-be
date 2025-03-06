'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Bouqouet,OrderItem}) {

      this.belongsTo(User)

      this.belongsToMany(Bouqouet,{
        through : OrderItem
      })
    }
  }
  Order.init({
    status: DataTypes.STRING,
    totalPrice: DataTypes.BIGINT,
    userId: DataTypes.UUID,
    addressId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};