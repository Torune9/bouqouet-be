const express = require('express')
const orderRouter = express.Router()

const createOrder = require('../../controller/order/createOrder')
const getOrder = require('../../controller/order/getOrder')
const detailOrder = require('../../controller/order/detailOrder')
const authenticate = require('../../services/middleware/authenticate')
const checkOrderStatus = require('../../controller/order/updateStatus')

orderRouter.use(authenticate)

orderRouter.get('/:userId',getOrder)

orderRouter.get('/detail/:id',detailOrder)

orderRouter.post('/',createOrder)

orderRouter.put('/:orderId',checkOrderStatus)

module.exports = orderRouter