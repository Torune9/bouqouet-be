const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ message: "Not authenticate" });
        }
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token invalid" });
            }
            next(); 
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan di server", error });
    }
};

module.exports = authenticate;
