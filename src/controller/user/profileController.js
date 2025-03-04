const { matchedData } = require("express-validator");
const { Profile } = require("../../database/models");
const deleteFiles = require("../../services/utils/deleteFile");

const { validate: isUUID } = require("uuid");

const deleteFilesProfile = (file)=>{
    if (file) deleteFiles([file.filename], "profiles")
}

const createOrUpdateProfile = async (req, res) => {
    const file = req?.file;
    try {
        const validated = matchedData(req);

        const { id } = req.params;
        
        if (!isUUID(id)) {
           deleteFilesProfile(file)
            return res.status(400).json({
                message: "uuid tidak valid",
            });
        }

        const [profile,created] = await Profile.findOrCreate({
            where : {
                userId : id
            },
            defaults : {
                userId : id,
                firstName : validated.firstName,
                lastName : validated.lastName,
                image : file?.filename ?? null
            }
        })    

        if (!created) {
            if (file && profile.image) {
                deleteFiles([profile.image], "profiles");  
            }
            await profile.update({
                firstName : validated.firstName ? validated.firstName : profile.firstName,
                lastName : validated.lastName ? validated.lastName : profile.lastName,
                image : file?.filename ? file?.filename : profile.image
            })

            return res.status(200).json({
                message : "profile berhasil di update",
                data : profile
            })
        }

        return res.status(201).json({
            message : "profile berhasil di buat",
            data : profile
        })

        
    } catch (error) {
        
        if (file) {
            deleteFiles([file?.filename], "profiles");
        }
        return res.status(500).json({
            message: "terjadi kesalahan server",
            error: error.message,
        });
    }
};

module.exports = createOrUpdateProfile;
