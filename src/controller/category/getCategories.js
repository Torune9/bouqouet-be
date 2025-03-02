const { Op } = require('sequelize')
const {Category} = require('../../database/models')

const getCategories = async (req,res)=>{
    try {
        const categories = await Category.findAll({
            where : {
                deletedAt : {
                    [Op.eq] : null
                }
            }
        })

        return res.status(200).json({
            message : "berhasil mendapatkan kategori",
            data : categories
        })
    } catch (error) {
        return res.status(500).json({
            message : "error ketika mendapatkan list kategori",
            error : error.message
        })
    }
}

module.exports = getCategories