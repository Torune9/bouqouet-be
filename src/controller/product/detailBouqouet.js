
const { Bouquet, sequelize } = require("../../database/models");

const getDetailBouqouet = async (req,res)=>{
    try {
        const {id} = req.params
        const bouquet = await Bouquet.findByPk(id)
        if (!bouquet) {
            return res.status(404).json({
                message : "data bouqouet tidak ditemukan"
            })
        }
        return res.json({
            message : "detail data bouqouet berhasil di dapatkan",
            data : bouquet
        })
    } catch (error) {
        return res.status(500).json({
            message : "error ketika mendapatkan detail bouqouet dari server",
            error
        })
    }
}

module.exports= getDetailBouqouet