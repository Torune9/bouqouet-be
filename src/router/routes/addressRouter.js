const express = require('express')
const createAddress = require('../../controller/address/createAddress')
const getAddress = require('../../controller/address/getAddress')
const updateAddress = require('../../controller/address/updateAddress')
const deleteAddress = require('../../controller/address/deleteAddress')

const addressRouter = express.Router()

addressRouter.get('/:id',getAddress)

addressRouter.post('/',createAddress)

addressRouter.put('/:id',updateAddress)

addressRouter.delete('/:id',deleteAddress)


module.exports = addressRouter