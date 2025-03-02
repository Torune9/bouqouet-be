const jwt = require('jsonwebtoken');

const generateJwt = (payload) => {
    
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        throw new Error("JWT_SECRET_KEY tidak ditemukan di environment variables");
    }

    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

module.exports = generateJwt;
