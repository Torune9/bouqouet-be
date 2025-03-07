const { matchedData } = require("express-validator");
const { Address, sequelize } = require("../../database/models");

const updateAddress = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { street, district, city, postalCode, province } = req.body;

        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({
                message : "id alamat tidak ditemukan"
            })
        }
        await address.update(
            {
                street: street ? street.trim() : address.street,
                district: district ? district.trim() : address.district,
                city: city ? city.trim() : address.city,
                postalCode: postalCode ? postalCode.trim() : address.postalCode,
                province: province ? province.trim() : address.province,
            },
            {
                where: id,
            },
            {
                transaction,
            }
        );
        await transaction.commit();
        return res.json({
            message: "berhasil mengubah alamat",
            data: address,
        });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: "error dari server ketika update alamat",
            error: error.message,
        });
    }
};

module.exports = updateAddress;
