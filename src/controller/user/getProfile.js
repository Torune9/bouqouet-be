const { Profile } = require("../../database/models");

const getProfile = async (req,res)=>{
    try {
        const {id} = req.params
        const profile = await Profile.findByPk(id)
        if (!profile) {
            return res.status(404).json({
                message :"gagal mendapatkan data profile,profile tidak ditemukan" 
            })
        }
        return res.json({
            message : "berhasil mendapatkan data profile",
            data : profile
        })
    } catch (error) {
        return res.status(500).json({
            message : "eror dari server,gagal mendapatkan data profile",
            error
        })
    }
}

module.exports = getProfile