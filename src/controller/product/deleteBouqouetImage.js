const { ImageBouqouet } = require("../../database/models");
const deleteFiles = require("../../services/utils/deleteFile");

const deleteBouquetImage = async (req, res) => {
    try {
        const { id } = req.params;

        const bouquet = await ImageBouqouet.findByPk(id);

        if (!bouquet) {
            return res.status(404).json({ message: "Bouquet tidak ditemukan" });
        }

        deleteFiles(null, null, [id]);
        
        await bouquet.destroy();
        
        return res.status(200).json({
            message: "Gambar berhasil dihapus",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan saat menghapus gambar",
            errors: error,
        });
    }
};

module.exports = deleteBouquetImage;
