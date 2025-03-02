const { Category } = require('../../database/models');

const updateCategory = async (req,res)=>{
    try {
        const {id} = req.params
        const {softDeleted,restored} = req.query
        const {name} = req.body

        const category = await Category.findByPk(id)

        if (!category) {
            return res.status(404).json({
                message : "kategori tidak ditemukan"
            })
        }

        category.name = name || category.name

        if (softDeleted) {
            category.deletedAt = new Date()
        }else if(restored){
            category.deletedAt = null
        }

        // update category
        await category.save()

        return res.status(200).json({
            message : "kategori berhasil di update",
            data : category
        })
    } catch (error) {
        return res.status(500).json({
            message : "error ketika update kategori",
            errors : error.message
        })
    }
}

module.exports = updateCategory