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

        // FIX: Pastikan `imageId` tidak `undefined` atau string kosong sebelum digunakan
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

        // FIX: Pastikan `imageId` adalah array string & tidak mengandung 'undefined'
        imageId = imageId.filter(id => id && id !== "undefined").map(String);

        const bouqouet = await Bouqouet.findByPk(id, {
            include: ImageBouqouet,
            transaction,
        });

        if (!bouqouet) {
            await transaction.rollback();
            return res.status(404).json({ message: "Bouquet tidak ditemukan" });
        }

        // FIX: Hanya jalankan query `findAll` jika `imageId` tidak kosong
        let imagesToUpdate = [];
        if (imageId.length > 0) {
            imagesToUpdate = await ImageBouqouet.findAll({
                where: {
                    id: { [Op.in]: imageId },
                    bouqouetId,
                },
                transaction,
            });
        }

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
                // Hapus gambar lama dari Cloudinary
                const deletePromises = imagesToUpdate.map((img) => {
                    const publicId = img.path.split("/").pop().split(".")[0]; 
                    return cloudinary.uploader.destroy(publicId);
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
