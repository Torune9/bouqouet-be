const {Address} = require('../../database/models') 

const updateOrCreateAddress = async (req,res)=>{
    try {
        const {id} = req.params
        const address = await Address.findOrCreate({
            where :  id
        },
        )
    } catch (error) {
        
    }
}

module.exports = updateOrCreateAddress