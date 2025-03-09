const jwt = require("jsonwebtoken");

const { Role } = require("../../database/models");

const isSuperAdmin = async (req, res, next) => {
    try {
        const authorization = req.get("Authorization");

        const bearer = authorization.startsWith("Bearer");

        const token = bearer ? authorization.split(" ")[1] : '';

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (verified.roleName !== 'super admin') {
            return res.status(401).json({
                message: "Not authorized",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: "error dari server saat mengakses data sebagai super-admin",
            error: error.message,
        });
    }
};

module.exports = isSuperAdmin;
