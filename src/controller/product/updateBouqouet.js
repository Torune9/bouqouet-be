const { Bouqouet, sequelize } = require("../../database/models");
const deleteFiles = require("../../services/utils/deleteFile");

const updateBouqouet = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { name, price, stock, description, categoryId, replaceImages } =
            req.body;

        const bouqouet = await Bouqouet.findByPk(id, { transaction });

        if (!bouqouet) {
            await transaction.rollback();
            return res.status(404).json({ message: "Bouquet tidak ditemukan" });
        }

        let currentImages = bouqouet.image || [];

        const replaceImagesObj = replaceImages ? JSON.parse(replaceImages) : {};

        const newFiles = req?.files?.["image"]
            ? req.files["image"].map((file) => file.filename)
            : [];
        const imagesToDelete = [];

        Object.entries(replaceImagesObj).forEach(([index, newFileName], i) => {
            const idx = parseInt(index);

            if (idx >= 0 && idx < currentImages.length) {
                imagesToDelete.push(currentImages[idx]);
                currentImages[idx] = newFiles[i] || newFileName;
            }
        });

        if (imagesToDelete.length > 0) {
            deleteFiles(imagesToDelete);
        }

        await bouqouet.update(
            {
                name: name?.trim() || bouqouet.name,
                price: price !== "" ? price ?? bouqouet.price : bouqouet.price,
                stock: stock !== "" ? stock ?? bouqouet.stock : bouqouet.stock,
                description: description.trim(),
                categoryId:
                    categoryId !== ""
                        ? categoryId ?? bouqouet.categoryId
                        : bouqouet.categoryId,
                image: currentImages,
            },

            { transaction }
        );

        await transaction.commit();

        return res.json({
            message: "Bouquet berhasil diupdate",
            data: bouqouet,
        });
    } catch (error) {
        await transaction.rollback();
        deleteFiles(req?.files?.["image"]?.map((file) => file.filename));

        return res
            .status(500)
            .json({ message: "Error update bouquet", error: error });
    }
};

module.exports = updateBouqouet;
