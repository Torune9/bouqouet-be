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

        // Pastikan imageId selalu dalam bentuk array
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

        // Pastikan bouquet ada
        const bouquet = await Bouquet.findByPk(id, {
            include: ImageBouquet,
            transaction,
        });

        if (!bouquet) {
            await transaction.rollback();
            return res.status(404).json({ message: "Bouquet tidak ditemukan" });
        }

        // Cari gambar yang akan diperbarui (hanya jika imageId diberikan)
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

        // Upload gambar baru ke Cloudinary (jika ada)
        let newImageUrls = [];
        if (newFiles.length > 0) {
            const uploadPromises = newFiles.map((file) =>
                cloudinary.uploader.upload(file, { folder: "bouquets" })
            );
            const uploadResults = await Promise.all(uploadPromises);
            newImageUrls = uploadResults.map((result) => result.secure_url);
        }

        // Update bouquet (jika ada perubahan)
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

        // Update gambar yang sudah ada
        if (imageId.length > 0 && newImageUrls.length > 0) {
            const updateImagePromises = imagesToUpdate.map(async (img, index) => {
                if (newImageUrls[index]) {
                    const publicId = img.path.split("/").pop().split(".")[0];
                    await cloudinary.uploader.destroy(publicId);
                    return img.update({ path: newImageUrls[index] }, { transaction });
                }
                return null;
            });
            await Promise.all(updateImagePromises);
        }

        // Tambahkan gambar baru ke database jika ada
        if (newImageUrls.length > 0) {
            const newImageRecords = newImageUrls.map((url) => ({
                bouquetId: id,
                path: url,
            }));
            await ImageBouquet.bulkCreate(newImageRecords, { transaction });
        }

        // Commit transaksi jika semua berhasil
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
