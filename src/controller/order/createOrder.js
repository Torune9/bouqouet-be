const { Order, OrderItem, sequelize } = require("../../database/models");
const snap = require("../../services/utils/midtrans");
const { v4: uuidv4 } = require("uuid");

const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            userId,
            addressId,
            totalPrice,
            items,
            firstName,
            lastName,
            email,
            phone,
        } = req.body;

        const newOrder = await Order.create(
            {
                userId,
                addressId,
                status: "pending",
                totalPrice,
            },
            {
                transaction,
            }
        );

        const orderItems = await items.map((item) => ({
            orderId: newOrder.id,
            bouquetId: item.id,
            quantity: item.quantity,
        }));

        const itemsOrder = await OrderItem.bulkCreate(orderItems, {
            transaction,
        });

        let parameter = {
            transaction_details: {
                order_id: `ORD-${uuidv4()}`,
                gross_amount: newOrder.totalPrice,
            },
            credit_card: {
                secure: true,
            },
            allow_retry: true,
            item_details: await items.map((item) => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name,
            })),
            customer_details: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
            },
        };

        const snapData = await snap.createTransaction(parameter);

        await transaction.commit();

        return res.json({
            message: "pesanan berhasil dibuat",
            data: snapData,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "eror dari server ketika membuat pesanan",
            error: error.message,
        });
    }
};

module.exports = createOrder;
