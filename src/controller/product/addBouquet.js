const { Bouqouet, Category, sequelize } = require("../../database/models");
const { matchedData } = require("express-validator");

const deleteFiles = require("../../services/utils/deleteFile");

const addBouqouet = async (req, res) => {
    const transaction = await sequelize.transaction();
    const file = req?.files?.["image"]
        ? req.files["image"].map((file) => file.filename)
        : [];
    try {
        const validated = matchedData(req);


        const category = await Category.findByPk(validated["categoryId"]);

        if (!category) {
            deleteFiles(file)
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        const bouqouet = await Bouqouet.create(
            {
                ...validated,
                image: file.length ? file : null,
            },
            {
                transaction,
            }
        );

        await transaction.commit();

        return res.status(200).json({
            message: "Bouquet berhasil dibuat",
            data: bouqouet,
        });
    } catch (error) {
        await transaction.rollback();
        deleteFiles(file);
        return res.status(500).json({
            message: "Error ketika memasukan data bouquet",
            errors: error.message,
        });
    }
};

module.exports = addBouqouet;
