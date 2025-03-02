const { Category } = require('../../database/models');

const createCategory = async (req, res) => {
    try {
        const {name} = req.body
        if (!req.body.name) {
            return res.status(400).json({
                message: "Nama kategori harus diisi"
            });
        }
        
        const [category, created] = await Category.findOrCreate({
            where: { name: name },
            defaults: { name: name.toLowerCase() }
        });

        if (created) {
            return res.status(201).json({
                message: "Kategori berhasil dibuat",
                category: category
            });
        } else {
            return res.status(200).json({
                message: "Kategori sudah ada",
                category: category
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error saat membuat kategori",
            errors: error.message
        });
    }
};

module.exports = createCategory;
