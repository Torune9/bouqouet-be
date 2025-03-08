const { Category } = require("../../database/models");

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                message: "category tidak ditemukan",
            });
        }

        await category.destroy({force:true});

        return res.json({
            message: "category berhasil dihapus",
        });
    } catch (error) {
        return res.status(500).json({
            message: "error dari server ketika menghapus kategori",
            error: error.message,
        });
    }
};

module.exports = deleteCategory;
