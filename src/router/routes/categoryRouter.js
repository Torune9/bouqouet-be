const createCategory = require('../../controller/category/addCategory')
const getCategories = require('../../controller/category/getCategories')
const updateCategory = require('../../controller/category/updateCategory')

const categoryRouter = require('express').Router()

categoryRouter.post('/',createCategory)

categoryRouter.get('/',getCategories)

categoryRouter.put('/:id',updateCategory)


module.exports = categoryRouter