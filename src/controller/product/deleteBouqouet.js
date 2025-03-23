const { Bouquet, ImageBouquet, sequelize } = require("../../database/models");
const { cloudinary } = require("../../services/utils/cloudinary");

const deleteBouqouet = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { force } = req.query;
        const bouqouet = await Bouquet.findByPk(id, {
            include: ImageBouquet,
            paranoid : false
        });

        if (!bouqouet) {
            return res.status(404).json({
                message: "Bouqouet tidak ditemukan",
            });
        }

        const images = bouqouet.ImageBouqouets;

        if (force) {
            if (images) {
                for (const image of images) {
                    const publicId = image.path.split("/").pop().split(".")[0];
                    await cloudinary.v2.uploader.destroy(publicId);
                }
            }
            await bouqouet.destroy({
                transaction,
                force,
            });
        } else {
            await bouqouet.destroy({ transaction });
        }
        await transaction.commit();

        return res.json({
            message: "Bouqouet berhasil dihapus",
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "Gagal menghapus Bouqouet. Terjadi kesalahan pada server.",
            error: error.message,
        });
    }
};

module.exports = deleteBouqouet;
