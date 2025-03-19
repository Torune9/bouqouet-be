const { OrderItem, Bouquet } = require("../../database/models");

const detailOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await OrderItem.findAll({
            where: {
                id,
            },
            include: {
                model: Bouquet,
            },
        });

        return res.json({
            message: "list data order berhasil di dapatkan",
            data: orders,
        });
    } catch (error) {
        return res.status(500).json({
            message: "eror dari server ketika mendapatkan data order",
            error: error.message,
        });
    }
};

module.exports = detailOrder;
