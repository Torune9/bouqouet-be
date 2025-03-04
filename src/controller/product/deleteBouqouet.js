const { Bouqouet, sequelize } = require("../../database/models");
const deleteFiles = require("../../services/utils/deleteFile");

const deleteBouqouet = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const {force} = req.query
        const bouqouet = await Bouqouet.findByPk(id);

        if (!bouqouet) {
            return res.status(404).json({
                message: "Bouqouet tidak ditemukan",
            });
        }

        
        if (force) {
            if (bouqouet.image) { 
                deleteFiles(bouqouet.image,"bouqouets"); 
            }
            await bouqouet.destroy({ 
                transaction,
                force
            });
        }else{     
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
