const { ImageBouqouet, sequelize } = require("../../database/models");
const { cloudinary } = require("../../services/utils/cloudinary");
const deleteFiles = require("../../services/utils/deleteFile");

const addImageBouquet = async (req, res) => {
    const transaction = await sequelize.transaction()
    const files = req.files ? req.files.image.map(file => file.path) : [];
    try {
        const { bouqouetId } = req.body;

        if (!bouqouetId) {
            return res.status(400).json({
                message: "bouquet id perlu di isi",
            });
        }

        let imageUrls = []

        if (files) {
            const uploadPromises = files.map((file) =>
                cloudinary.v2.uploader.upload(file, { folder: "bouqouets" })
            );
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults.map((result) => result.secure_url);
        }

        if (imageUrls) {
            const temp = imageUrls.map((path) => ({
                bouqouetId,
                path: path,
            }));
            var imageBouquet = await ImageBouqouet.bulkCreate(temp, { transaction });
        }

        await transaction.commit()

        deleteFiles(files,"bouqouets")

        return res.json({
            message : "gambar bouquet berhasil ditambahkan",
            data : imageBouquet
        })
    } catch (error) {
        await transaction.rollback()
        deleteFiles(files,"bouqouets")
        return res.status(500).json({
            message : "error dari server ketika menambah gambar",
            error : error.message
        })
    }
};

module.exports = addImageBouquet;
