"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Bouquet, OrderItem }) {
            this.belongsTo(User, {
                foreignKey: "userId",
            });

            this.hasMany(OrderItem, {
                foreignKey: "orderId",
            });

            this.belongsToMany(Bouquet, {
                through: OrderItem,
                foreignKey: "orderId",
            });
        }
    }
    Order.init(
        {
            status: DataTypes.STRING,
            totalPrice: DataTypes.BIGINT,
            userId: DataTypes.UUID,
            addressId: DataTypes.UUID,
            token : DataTypes.STRING,
            midtransOrderId : DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Order",
        }
    );
    return Order;
};
