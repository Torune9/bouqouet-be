const { Op } = require("sequelize");
const { Bouqouet, ImageBouqouet, sequelize } = require("../../database/models");
const { cloudinary } = require("../../services/utils/cloudinary");
const deleteFiles = require("../../services/utils/deleteFile");

const updateBouqouet = async (req, res) => {
    const transaction = await sequelize.transaction();
    const newFiles = req?.files?.["image"]
        ? req.files["image"].map((file) => file.path) // Gunakan path lengkap ke file
        : [];

    try {
        const { id } = req.params;
        let {
            name,
            price,
            stock,
            description,
            categoryId,
            bouqouetId = id,
            imageId,
        } = req.body;

        // Pastikan imageId adalah array
        if (typeof imageId === "string") {
            try {
                imageId = JSON.parse(imageId); // Jika berbentuk string array, ubah ke array asli
            } catch (error) {
                imageId = [imageId]; // Jika bukan array, jadikan array biasa
            }
        }
        imageId = Array.isArray(imageId)
            ? imageId.map(String)
            : [String(imageId)]; // Pastikan dalam bentuk array string

        const bouqouet = await Bouqouet.findByPk(id, {
            include: ImageBouqouet,
            transaction,
        });

        if (!bouqouet) {
            await transaction.rollback();
            return res.status(404).json({ message: "Bouquet tidak ditemukan" });
        }

        const imagesToUpdate = await ImageBouqouet.findAll({
            where: {
                id: { [Op.in]: imageId },
                bouqouetId,
            },
            transaction,
        });

        // Upload gambar baru ke Cloudinary jika ada
        let imageUrls = [];
        if (newFiles.length > 0 && imagesToUpdate.length !== 0) {
            const uploadPromises = newFiles.map((file) =>
                cloudinary.uploader.upload(file, { folder: "bouqouets" })
            );
            const uploadResults = await Promise.all(uploadPromises);
            imageUrls = uploadResults.map((result) => result.secure_url);
        }

        // Update data bouquet
        await bouqouet.update(
            {
                name: name?.trim() || bouqouet.name,
                price: price !== "" ? price ?? bouqouet.price : bouqouet.price,
                stock: stock !== "" ? stock ?? bouqouet.stock : bouqouet.stock,
                description: description?.trim() || bouqouet.description,
                categoryId:
                    categoryId !== ""
                        ? categoryId ?? bouqouet.categoryId
                        : bouqouet.categoryId,
            },
            { transaction }
        );

        // Jika ada gambar yang ingin diperbarui
        if (newFiles.length > 0 && imageId.length > 0) {
            if (imagesToUpdate.length > 0) {
                // Hapus gambar lama dari Cloudinary dengan public_id
                const deletePromises = imagesToUpdate.map((img) => {
                    const publicId = img.path.split("/").pop().split(".")[0];
                     // Ambil public_id dari URL Cloudinary
                    return cloudinary.v2.uploader.destroy(publicId);
                });
                await Promise.all(deletePromises);

                // Hapus gambar lama dari database
                await ImageBouqouet.destroy({
                    where: {
                        id: { [Op.in]: imageId },
                    },
                    transaction,
                });

                // Tambahkan gambar baru ke database
                const newImageRecords = imageUrls.map((url) => ({
                    path: url,
                    bouqouetId,
                }));

                await ImageBouqouet.bulkCreate(newImageRecords, {
                    transaction,
                });
            }
        }

        await transaction.commit();

        // Hapus file lokal setelah transaksi berhasil
        deleteFiles(newFiles, "bouqouets");

        return res.json({
            message: "Bouquet berhasil diupdate",
            data: bouqouet,
        });
    } catch (error) {
        console.error(error);

        await transaction.rollback();
        deleteFiles(newFiles, "bouqouets");

        return res.status(500).json({
            message: "Error update bouquet",
            error: error.message,
        });
    }
};

module.exports = updateBouqouet;
