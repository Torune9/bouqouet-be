const { Profile } = require("../../database/models");
const deleteFiles = require("../../services/utils/deleteFile");

const deleteProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await Profile.findByPk(id);

        if (profile && profile.image) {
            deleteFiles([profile.image], "profiles");
            profile.image = null;
        }

        await profile.save();

        return res.status(200).json({
            message : "profile berhasil dihapus"
        })
    } catch (error) {
        return res.status(500).json({
            message : "error ketika menghapus profile",
            error : error.message
        })
    }
};

module.exports = deleteProfileImage;
