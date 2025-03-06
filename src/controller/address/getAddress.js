const {Address} = require('../../database/models')

const getAddress = async (req,res)=>{
    try {
        const {id} = req.params
        const address = await Address.findAll({
            where : {
                userId : id
            },
            attributes : {
                exclude : ['createdAt','updatedAt']
            }
        })

        return res.json({
            message : "berhasil mendapatkan alamat",
            data : address
        })
    } catch (error) {
        return res.status(500).json({
            message : "error dari server ketika mendapatkan data alamat",
            error
        })
    }
}

module.exports = getAddress