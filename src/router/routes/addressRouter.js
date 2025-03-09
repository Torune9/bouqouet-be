const express = require('express')
const createAddress = require('../../controller/address/createAddress')
const getAddress = require('../../controller/address/getAddress')
const updateAddress = require('../../controller/address/updateAddress')
const deleteAddress = require('../../controller/address/deleteAddress')
const { validateAddress } = require('../../services/middleware/validator')
const authenticate = require('../../services/middleware/authenticate')

const addressRouter = express.Router()

addressRouter.use(authenticate)

addressRouter.get('/:id',getAddress)

addressRouter.post('/',validateAddress,createAddress)

addressRouter.put('/:id',updateAddress)

addressRouter.delete('/:id',deleteAddress)


module.exports = addressRouter