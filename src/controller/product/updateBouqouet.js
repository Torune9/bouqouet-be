const { Op } = require("sequelize");
const { Bouquet, ImageBouquet, sequelize } = require("../../database/models");
const { cloudinary } = require("../../services/utils/cloudinary");
const deleteFiles = require("../../services/utils/deleteFile");

const updateBouquet = async (req, res) => {
    const transaction = await sequelize.transaction();
    const newFiles = req?.files?.["image"]
        ? req.files["image"].map((file) => file.path)
        : [];

    try {
        const { id } = req.params;
        let { name, price, stock, description, categoryId, imageId } = req.body;

        if (!imageId || imageId === "undefined") {
            imageId = [];
        } else if (typeof imageId === "string") {
            try {
                imageId = JSON.parse(imageId);
                if (!Array.isArray(imageId)) {
                    imageId = [imageId];
                }
            } catch (error) {
                imageId = [imageId];
            }
        }

        imageId = imageId.filter(id => id && id !== "undefined").map(String);

        const bouquet = await Bouquet.findByPk(id, {
            include: ImageBouquet,
            transaction,
        });

        if (!bouquet) {
            await transaction.rollback();
            return res.status(404).json({ message: "Bouquet tidak ditemukan" });
        }

        let imagesToUpdate = [];
        if (imageId.length > 0) {
            imagesToUpdate = await ImageBouquet.findAll({
                where: {
                    id: { [Op.in]: imageId },
                    bouquetId: id,
                },
                transaction,
            });
        }

        let imageUrls = [];
        if (newFiles.length > 0) {
            const uploadPromises = newFiles.map((file) =>
                cloudinary.uploader.upload(file, { folder: "bouquets" })
            );
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults.map((result) => result.secure_url);
        }

        await bouquet.update(
            {
                name: name?.trim() || bouquet.name,
                price: price !== "" ? price ?? bouquet.price : bouquet.price,
                stock: stock !== "" ? stock ?? bouquet.stock : bouquet.stock,
                description: description?.trim() || bouquet.description,
                categoryId: categoryId !== "" ? categoryId ?? bouquet.categoryId : bouquet.categoryId,
            },
            { transaction }
        );

        if (imageId.length > 0 && imageUrls.length > 0) {
            const updateImagePromises = imagesToUpdate.map(async (img, index) => {
                if (imageUrls[index]) {
                    const publicId = img.path.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                    return img.update({ path: imageUrls[index] }, { transaction });
                }
                return null;
            });
            await Promise.all(updateImagePromises);
        }

        await transaction.commit();
        deleteFiles(newFiles, "bouquets");

        return res.json({ message: "Bouquet berhasil diperbarui", data: bouquet });
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        deleteFiles(newFiles, "bouquets");
        return res.status(500).json({ message: "Error memperbarui bouquet", error: error.message });
    }
};

module.exports = updateBouquet;