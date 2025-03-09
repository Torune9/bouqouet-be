const { Role } = require("../../database/models");

const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();

        return res.json({
            messsage: "berhasil mendapatkan list data role",
            data: roles,
        });
    } catch (error) {
        return res.status(500).json({
            message:
                "error dari server saat mencoba mendapatkan data list role",
            error: error.message,
        });
    }
};

const addRole = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "nama harus di isi",
            });
        }
        const role = await Role.create({ name });

        return res.json({
            messsage: "berhasil menambah role",
            data: role,
        });
    } catch (error) {
        return res.status(500).json({
            message: "error dari server saat mencoba menambah role",
            error: error.message,
        });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({
                message: "role tidak ditemukan",
            });
        }

        await role.destroy();

        return res.json({
            messsage: "berhasil mengahapus role",
            data: role,
        });
    } catch (error) {
        return res.status(500).json({
            message:
                "error dari server saat mencoba mendapatkan data list role",
            error: error.message,
        });
    }
};

module.exports = { getRoles, addRole, deleteRole };
