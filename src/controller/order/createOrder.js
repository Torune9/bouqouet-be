const { Order, OrderItem, sequelize } = require("../../database/models");
const {snap} = require("../../services/utils/midtrans");
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

        let orderId = `ORD-${uuidv4()}`;

        let parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: parseInt(totalPrice),
            },
            credit_card: {
                secure: true,
            },
            allow_retry: true,
            item_details: items.map((item) => ({
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

        const newOrder = await Order.create(
            {
                userId,
                addressId,
                status: "pending",
                totalPrice,
                token: snapData.token,
                midtransOrderId: orderId,
            },
            {
                transaction,
            }
        );

        const orderItems = items.map((item) => ({
            orderId: newOrder.id,
            bouquetId: item.id,
            quantity: item.quantity,
        }));

        await OrderItem.bulkCreate(orderItems, { transaction });

        await transaction.commit();

        return res.json({
            message: "Pesanan berhasil dibuat",
            data: {
                order: newOrder,
                snapToken: snapData.token,
                redirectUrl: snapData.redirect_url,
            },
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Error dari server ketika membuat pesanan",
            error: error.message,
        });
    }
};

module.exports = createOrder;
