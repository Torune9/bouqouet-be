const { body, validationResult } = require("express-validator");

const validated = (req, res, next) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

// validasi data login
const validateLogin = [
    body("email")
        .notEmpty()
        .isEmail()
        .trim()
        .withMessage("Format email tidak valid"),
    body("password").notEmpty().trim().withMessage("Password wajib di isi"),
    validated
];

// validasi data register
const validateRegister = [
    body("username").notEmpty().trim().withMessage("username wajib di isi"),
    ...validateLogin
];

//validasi data profile
const validateProfile = [
    body(["firstName", "lastName"]).notEmpty().trim().escape(),
    validated
];

// validasi data produk
const validateBouqouet = [
    body("name")
        .notEmpty()
        .escape()
        .trim()
        .withMessage("nama tidak boleh kosong"),
    body("price").notEmpty().escape().isInt().withMessage("price harus angka"),
    body("stock").notEmpty().escape().isInt().withMessage("stock harus angka"),
    body("categoryId").optional().escape(),
    body("description").optional().escape().trim(),
    body("image").optional(),
    validated
];

// validasi data address
const validateAddress =[
    body(["street","district","city","postalCode","province"]).trim()
    .notEmpty().escape().withMessage("field tidak boleh kosong"),
    validated
]
module.exports = {
    validateLogin,
    validateRegister,
    validateProfile,
    validateBouqouet,
    validateAddress
};
