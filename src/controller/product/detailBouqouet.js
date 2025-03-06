
const { Bouqouet, sequelize } = require("../../database/models");

const getDetailBouqouet = async (req,res)=>{
    try {
        const {id} = req.params
        const bouqouet = await Bouqouet.findByPk(id)
        if (!bouqouet) {
            return res.status(404).json({
                message : "data bouqouet tidak ditemukan"
            })
        }
        return res.json({
            message : "detail data bouqouet berhasil di dapatkan",
            data : bouqouet
        })
    } catch (error) {
        return req.status(500).json({
            message : "error ketika mendapatkan detail bouqouet dari server",
            error
        })
    }
}

module.exports= getDetailBouqouet