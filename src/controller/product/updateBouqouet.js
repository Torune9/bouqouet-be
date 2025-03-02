const { Bouqouet } = require("../../database/models");

const updateBouqouet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock, description, categoryId } = req.body;
        const bouqouet = await Bouqouet.findByPk(id);

        if (!bouqouet) {
            return res.status(404).json({
                message: "Bouqouet tidak ditemukan",
            });
        }

        const file = req?.files?.["image"]?.map((file) => file.filename);
        let fileName = file ? JSON.stringify(file) : bouqouet.image;

        
        bouqouet.image = fileName;
        bouqouet.name = name !== "" ? name ?? bouqouet.name : bouqouet.name;
        bouqouet.price = price !== "" ? price ?? bouqouet.price : bouqouet.price;
        bouqouet.stock = stock !== "" ? stock ?? bouqouet.stock : bouqouet.stock;
        bouqouet.description = description !== "" ? description ?? bouqouet.description : bouqouet.description;
        bouqouet.categoryId = categoryId !== "" ? categoryId ?? bouqouet.categoryId : bouqouet.categoryId;

        await bouqouet.save();

        return res.json({
            message: "Bouquet berhasil diupdate",
            data: bouqouet
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error ketika update bouquet dari server",
            error: error.message
        });
    }
};

module.exports = updateBouqouet;
