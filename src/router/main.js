const express = require('express')

const userRouter = require('../router/routes/userRouter.js')
const bouqouetRouter = require('./routes/bouqouetRouter.js')
const categoryRouter = require('./routes/categoryRouter.js')
const addressRouter = require('./routes/addressRouter.js')

const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/user/address', addressRouter)
mainRouter.use('/category',categoryRouter)
mainRouter.use('/bouqouet', bouqouetRouter)

module.exports = mainRouter
