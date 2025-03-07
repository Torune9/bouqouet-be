const { matchedData } = require("express-validator");

const { Address } = require("../../database/models");

const createAddress = async (req, res) => {
    try {
        const validated = matchedData(req)
      
        const address = await Address.create(validated)
        if (!address) {
            return res.status(400).json({
                message : "gagal menambahkan alamat"
            })
        }
        return res.json({
            message : "alamat berhasil ditambhkan",
            data : address
        })
    } catch (error) {
        return res.status(500).json({
            message : "gagal saat menambahkan alamat ,eror dari sever",
            error
        })
    }
};

module.exports = createAddress
