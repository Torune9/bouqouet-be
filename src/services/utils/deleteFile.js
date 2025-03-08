const fs = require("fs");

const path = require("path");

const cloudinary = require("./cloudinary");

const deleteFiles = async (files, dir = "", cloudinaryIds = []) => {
    
    if (!files || files.length === 0) return;

    files.forEach((file) => {
        let filePath;

        if (file.includes("/") || file.includes("\\")) {
            filePath = path.resolve(file);
        } else {
            filePath = path.join(__dirname, `../../assets/${dir}`, file);
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Gagal menghapus file lokal: ${filePath}`, err);
            } else {
                console.log(`Berhasil menghapus file lokal: ${filePath}`);
            }
        });
    });

    if (cloudinaryIds.length > 0) {
        const deletePromises = cloudinaryIds.map((id) =>
            cloudinary.uploader.destroy(id)
        );

        try {
            await Promise.all(deletePromises);
            console.log("Berhasil menghapus gambar dari Cloudinary:", cloudinaryIds);
        } catch (error) {
            console.error("Gagal menghapus gambar dari Cloudinary:", error);
        }
    }
};

module.exports = deleteFiles;
