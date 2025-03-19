const {Order,OrderItem,Bouquet} = require('../../database/models')

const getOrder = async (req,res) => {
    try {
        const {userId} = req.params

        const orders = await Order.findAll({
            where : {
                userId
            },
            include : {
                model : OrderItem,
                required : true,
                include : {
                    model : Bouquet,
                    attributes : {
                        exclude : ["createdAt","updatedAt"]
                    }
                }
            } 
        })

        return res.json({
            message : "list data order berhasil di dapatkan",
            data : orders
        })
    } catch (error) {
        return res.status(500).json({
            message : "eror dari server ketika mendapatkan data order",
            error : error.message
        })
    }
}

module.exports = getOrder