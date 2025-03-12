const { Op } = require('sequelize');
const {Bouqouet,ImageBouqouet} = require('../../database/models')

const getAllBouqouet = async (req,res)=>{
    try {
        const whereCondition = {};

        if (req.query.category) {
            whereCondition.categoryId = req.query.category;
        }

        if (req.query.stockBelow) {
            whereCondition.stock = { [Op.lte] : req.query.stockBelow };
        }

        const sortOptions = {
            priceAsc: [['price', 'ASC']],
            priceDesc: [['price', 'DESC']],
            latest: [['createdAt', 'DESC']],
            oldest: [['createdAt', 'ASC']],
            latestPriceAsc: [['createdAt', 'DESC'], ['price', 'ASC']],
            stock : ['stock','DESC']
        };
        
        const order = sortOptions[req.query.sortBy] || [['createdAt', 'DESC']];

        const bouqouets = await Bouqouet.findAll({
            where: whereCondition, 
            include: [{ model: ImageBouqouet }],
            order
        });

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