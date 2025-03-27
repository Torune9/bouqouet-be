const { matchedData } = require("express-validator");
const { Profile } = require("../../database/models");
const deleteFiles = require("../../services/utils/deleteFile");
const { validate: isUUID } = require("uuid");
const { cloudinary } = require("../../services/utils/cloudinary");
const fs = require("fs");

const deleteFilesProfile = async (file) => {
    if (file) {
        const publicID = file.split("/").pop().split(".")[0]
        await cloudinary.v2.uploader.destroy(publicID);
    }
};

const createOrUpdateProfile = async (req, res) => {
    const file = req?.file;
    try {
        const validated = matchedData(req);
        const { id } = req.params;

        if (!isUUID(id)) {
            if (file) {
                deleteFiles(file);
            }
            return res.status(400).json({ message: "UUID tidak valid" });
        }

        let uploadedImage = null;
        if (file) {
            const uploadResult = await cloudinary.v2.uploader.upload(
                file.path,
                {
                    folder: "profiles",
                }
            );
            uploadedImage = uploadResult.secure_url;
            deleteFiles([file.path]);
        }

        const [profile, created] = await Profile.findOrCreate({
            where: { userId: id },
            defaults: {
                userId: id,
                firstName: validated.firstName,
                lastName: validated.lastName,
                phoneNumber: validated.phoneNumber,
                image: uploadedImage,
            },
        });

        if (!created) {
            if (uploadedImage && profile.image) {
                await deleteFilesProfile(profile.image);
            }

            await profile.update({
                firstName: validated.firstName || profile.firstName,
                lastName: validated.lastName || profile.lastName,
                phoneNumber : validated.phoneNumber || profile.phoneNumber,
                image: uploadedImage || profile.image,
            });

            return res.status(200).json({
                message: "Profile berhasil diperbarui",
                data: profile,
            });
        }

        return res.status(201).json({
            message: "Profile berhasil dibuat",
            data: profile,
        });
    } catch (error) {
        if (file) {
            deleteFiles([file.path])
        }
        return res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error.message,
        });
    }
};

module.exports = createOrUpdateProfile;
