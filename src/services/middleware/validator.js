const { body,validationResult } = require("express-validator");


// validasi data login
const validateLogin = [
    body("email").notEmpty().isEmail().trim().withMessage("Format email tidak valid"),
    body("password").notEmpty().trim().withMessage("Password wajib di isi"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// validasi data register
const validateRegister = [
    body("username").notEmpty().trim().withMessage("username wajib di isi"),
    body("email").notEmpty().isEmail().trim().withMessage("format email tidak valid"),
    body("password").notEmpty().isLength({min:8}).trim().withMessage("password minimal 8 karakter"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// alidasi data produk
const validateBouqouet = [
    body("name").notEmpty().escape().trim().withMessage("nama tidak boleh kosong"),
    body("price").notEmpty().escape().isInt().withMessage("price harus angka"),
    body("stock").notEmpty().escape().isInt().withMessage("stock harus angka"),
    body("categoryId").optional().escape(),
    body("description").optional().escape().trim(),
    body("image").optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports = {validateLogin,validateRegister,validateBouqouet}
