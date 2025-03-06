const { matchedData } = require("express-validator");
const generateJwt = require("../../services/utils/jsonWebToken");
const {
    decryptPassword,
    encryptPassword,
} = require("../../services/utils/validatePassword");

const { User } = require("../../database/models");

const signIn = async (req, res) => {
    try {
        const validated = matchedData(req);

        const user = await User.findOne({
            attributes: ["id", "username", "email", "roleId", "password"],
            where: {
                email: validated.email,
            },
        });

        if (!user) {
            return res.status(404).json({
                message: "user tidak ditemukan",
            });
        }

        const validPassword = decryptPassword(
            validated.password,
            user.password
        );

        const detailUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role_id,
        };

        if (!validPassword) {
            return res.status(400).json({
                message: "salah password",
            });
        }

        const token = generateJwt(detailUser);

        return res.status(200).json({
            message: "login berhasil",
            data: detailUser,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error ketika login dari server",
            errors: error.message,
        });
    }
};

const signUp = async (req, res) => {
    try {
        const validated = matchedData(req);
        const payload = {
            username: validated.username,
            email: validated.email,
            password: encryptPassword(validated.password),
        };
        const [user, created] = await User.findOrCreate({
            where: {
                email: validated.email,
            },
            defaults: payload,
        });

        if (created) {
            return res.status(201).json({
                message: "register berhasil",
            });
        } else {
            return res.status(200).json({
                message: "email sudah terpakai",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "error ketika membuat akun",
            errors: error.message,
        });
    }
};

module.exports = { signIn, signUp };
