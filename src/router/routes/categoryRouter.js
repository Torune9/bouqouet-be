const createCategory = require('../../controller/category/addCategory')
const deleteCategory = require('../../controller/category/deleteCategory')
const getCategories = require('../../controller/category/getCategories')
const updateCategory = require('../../controller/category/updateCategory')
const authenticate = require('../../services/middleware/authenticate')
const authorized = require('../../services/middleware/authorization')

const categoryRouter = require('express').Router()


categoryRouter.get('/',getCategories)

categoryRouter.use(authenticate)

categoryRouter.use(authorized)

categoryRouter.post('/',createCategory)

categoryRouter.put('/:id',updateCategory)

categoryRouter.delete('/:id',deleteCategory)


module.exports = categoryRouter