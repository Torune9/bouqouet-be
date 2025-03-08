const {Bouqouet,ImageBouqouet} = require('../../database/models')

const getAllBouqouet = async (req,res)=>{
    try {
        const bouqouets = await Bouqouet.findAll({
            include : ImageBouqouet
        })
        return res.status(200).json({
            message : "berhasil mendapatkan list data bouqouet",
            data : bouqouets
        })
    } catch (error) {
        return res.status(500).json({
            message : "error ketika mendapatkan list bouqouet",
            errors : error.message
        })
    }
}

module.exports = getAllBouqouet