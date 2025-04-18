'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User,{
        foreignKey : 'userId'
      })
    }
  }
  Address.init({
    userId : DataTypes.UUID,
    street: DataTypes.STRING,
    district: DataTypes.STRING,
    regency: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    province: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};