const express = require('express')
const orderRouter = express.Router()

const createOrder = require('../../controller/order/createOrder')
const getOrder = require('../../controller/order/getOrder')
const detailOrder = require('../../controller/order/detailOrder')

orderRouter.get('/:userId',getOrder)

orderRouter.get('/detail/:id',detailOrder)

orderRouter.post('/',createOrder)

module.exports = orderRouter