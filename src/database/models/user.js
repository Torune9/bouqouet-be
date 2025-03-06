'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Profile,Role,Order,Address}) {

      this.belongsTo(Role)

      this.hasOne(Profile)

      this.hasMany(Address)

      this.hasMany(Order)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};