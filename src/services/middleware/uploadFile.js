const multer = require("multer");
const path = require("path")

const maxSize = 5 * 1024 * 1024; // 5MB


const storageBouqouetImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/assets/bouqouets");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const storageProfileImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/assets/profiles");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});


const uploadImageProduct = multer({
    storage: storageBouqouetImage,
    limits : {
        fileSize : maxSize
    },
    fileFilter : (req,file,cb)=>{
        const filetypes = /jpg|jpeg|png/
        const mimetype = filetypes.test(file.mimetype)
        
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
 }).fields([{name : 'image',maxCount : 5}]);


const uploadImageProfile = multer({
    storage: storageProfileImage,
    limits : {
        fileSize : maxSize
    },
    fileFilter : (req,file,cb)=>{
        const filetypes = /jpg|jpeg|png/
        const mimetype = filetypes.test(file.mimetype)
        
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
 }).single('image');

module.exports = {uploadImageProduct,uploadImageProfile}
