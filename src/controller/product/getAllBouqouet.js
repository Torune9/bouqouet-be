const { Op } = require("sequelize");
const { Bouquet, ImageBouquet, Category } = require("../../database/models");

const getAllBouqouet = async (req, res) => {
    try {
        const {
            stockBelow,
            stockAbove,
            maxPrice,
            minPrice,
            category,
            sortBy,
            paranoid,
        } = req.query;
        const whereCondition = {};

        // Filter berdasarkan 1 kategori saja
        if (category) {
            whereCondition.categoryId = category;
        }

        // Filter berdasarkan stok (hanya bisa satu: stockBelow atau stockAbove, tidak bisa keduanya)
        if (stockBelow) {
            whereCondition.stock = { [Op.lte]: parseInt(stockBelow, 10) };
        } else if (stockAbove) {
            whereCondition.stock = { [Op.gte]: parseInt(stockAbove, 10) };
        }

        // Filter berdasarkan rentang harga
        if (minPrice) {
            whereCondition.price = { [Op.lt]: parseInt(minPrice, 10) };
        }
        if (maxPrice) {
            whereCondition.price = {
                ...whereCondition.price,
                [Op.gt]: parseInt(maxPrice, 10),
            };
        }

        // Sorting berdasarkan permintaan user
        let order = [["createdAt", "DESC"]]; // Default: terbaru duluan
        if (sortBy) {
            const sortOptions = {
                priceAsc: [["price", "ASC"]],
                priceDesc: [["price", "DESC"]],
                stockAsc: [["stock", "ASC"]],
                stockDesc: [["stock", "DESC"]],
                oldest: [["createdAt", "ASC"]],
            };

            // Jika user memasukkan sortBy yang valid, pakai itu. Jika tidak, gunakan default.
            order = sortOptions[sortBy] || order;
        }
        // Cek jika ingin get paranoid data
        if (paranoid) {
            whereCondition.deletedAt = {
                [Op.ne]: null,
            };
        }

        const bouquets = await Bouquet.findAll({
            where: whereCondition,
            include: [
                {
                    model: ImageBouquet,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
                {
                    model: Category,
                    attributes: ["name", "id"],
                },
            ],
            order,
            paranoid: !paranoid,
        });
        return res.status(200).json({
            message: "Berhasil mendapatkan list data bouquet",
            data: bouquets,
        });
    } catch (error) {
        console.error("Error saat mendapatkan list bouquet:", error);

        return res.status(500).json({
            message: "Error ketika mendapatkan list bouquet",
            errors: error.message,
        });
    }
};

module.exports = getAllBouqouet;
