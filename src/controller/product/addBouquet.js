const { Bouqouet,Category } = require('../../database/models');
const { matchedData } = require("express-validator");

const addBouqouet = async (req, res) => {
    try {
        const validated = matchedData(req);

        const file = req?.files?.['image'] ? req.files['image'].map(file => file.filename) : [];
        
        const category = await Category.findByPk(validated['categoryId']) 

        if (!category) {
            return response.status(404).json({
                message : 'Kategori tidak ditemukan'
            })
        }

        const bouqouet = await Bouqouet.create({
            ...validated,
            image: file.length ? file : null,
        });

        return res.status(200).json({
            message: "Bouquet berhasil dibuat",
            data: bouqouet
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error ketika memasukan data bouquet",
            errors: error.message,
        });
    }
};

module.exports = addBouqouet;
