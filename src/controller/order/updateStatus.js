const { Order } = require("../../database/models");
const { apiClient } = require("../../services/utils/midtrans");

const checkOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params; 
        const transactionStatus = await apiClient.transaction.status(orderId);

        let newStatus;
        if (transactionStatus.transaction_status === "settlement") {
            newStatus = "paid";
        } else if (transactionStatus.transaction_status === "pending") {
            newStatus = "pending";
        } else if (
            transactionStatus.transaction_status === "cancel" ||
            transactionStatus.transaction_status === "expire"
        ) {
            newStatus = "canceled";
        } else if (transactionStatus.transaction_status === "deny") {
            newStatus = "failed";
        } else {
            newStatus = "pending"; 
        }

        const order = await Order.findOne({ where: { midtransOrderId : orderId } });
        if (!order) {
            return res.status(404).json({ message: "Order tidak ditemukan" });
        }

        await order.update({ status: newStatus });

        return res.json({
            message: "Status order diperbarui",
            status: newStatus,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal mengambil status order",
            error: error.message,
        });
    }
};

module.exports = checkOrderStatus;
