const express = require('express')
const isSuperAdmin = require('../../services/middleware/isSuperAdmin')
const { getRoles, addRole, deleteRole } = require('../../controller/role/roleController')
const authenticate = require('../../services/middleware/authenticate')

const roleRouter = express.Router()

roleRouter.use(authenticate)

roleRouter.use(isSuperAdmin)

roleRouter.get('/',getRoles)

roleRouter.post('/',addRole)

roleRouter.delete('/:id',deleteRole)


module.exports = roleRouter