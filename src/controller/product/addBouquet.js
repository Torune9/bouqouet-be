const {
    Bouquet,
    Category,
    ImageBouquet,
    sequelize,
} = require("../../database/models");
const { matchedData } = require("express-validator");

const deleteFiles = require("../../services/utils/deleteFile");
const { cloudinary } = require("../../services/utils/cloudinary");

const addBouqouet = async (req, res) => {
    const transaction = await sequelize.transaction();
    const files = req.files["image"]
        ? req?.files["image"]?.map((file) => file.path)
        : null;
    try {
        const validated = matchedData(req);

        const category = await Category.findByPk(validated["categoryId"]);

        if (!category) {
            return res.status(404).json({
                message: "Kategori tidak ditemukan",
            });
        }

        const bouqouet = await Bouquet.create(validated, {
            transaction,
        });

        if (files) {
            const uploadPromises = files.map((file) =>
                cloudinary.v2.uploader.upload(file, { folder: "bouqouets" })
            );
            const uploadResults = await Promise.all(uploadPromises);
            var imageUrls = uploadResults.map((result) => result.secure_url);
        }
        if (imageUrls) {
            const temp = imageUrls.map((path) => ({
                bouqouetId: bouqouet.id,
                path: path,
            }));
            var image = await ImageBouquet.bulkCreate(temp, { transaction });
        }

        files ? deleteFiles(files, "bouqouets") : "";
        await transaction.commit();

        return res.status(200).json({
            message: "Bouquet berhasil dibuat",
            data: bouqouet,
            image,
        });
    } catch (error) {
        await transaction.rollback();
        files ? deleteFiles(files, "bouqouets") : "";
        console.log(error);

        return res.status(500).json({
            message: "Error ketika memasukan data bouquet",
            errors: error,
        });
    }
};

module.exports = addBouqouet;
