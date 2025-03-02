const fs = require("fs");
const path = require("path");

const deleteFiles = (files) => {
    if (!files || files.length === 0) return;

    files.forEach((filename) => {
        const filePath = path.join(__dirname, "../../assets/uploads", filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Gagal menghapus file: ${filePath}`, err);
            }
        });
    });
};

module.exports =  deleteFiles;
