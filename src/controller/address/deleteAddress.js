const { Address, sequelize } = require("../../database/models");

const deleteAddress = async(req,res)=>{
    const transaction = await sequelize.transaction()
    try {
        const {id} = req.params
        await Address.destroy({
            where : {
                id
            }
        },{
            transaction
        })

        await transaction.commit()
        return res.json({
            message : "alamat berhasil dihapus",
        })
    } catch (error) {
        await transaction.rollback()
        console.log(error);
        
        return res.status(500).json({
            message : "eror dari server ketika menghapus alamat",
            error
        })
    }
}
module.exports = deleteAddress