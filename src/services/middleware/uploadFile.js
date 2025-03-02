const multer = require("multer");
const path = require("path")

const maxSize = 5 * 1024 * 1024; // 5MB


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/assets/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});



const upload = multer({
    storage: storage,
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

module.exports = upload
