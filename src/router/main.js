const express = require('express')

const userRouter = require('../router/routes/userRouter.js')
const bouqouetRouter = require('./routes/bouqouetRouter.js')
const categoryRouter = require('./routes/categoryRouter.js')

const mainRouter = express.Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/category',categoryRouter)
mainRouter.use('/bouqouet', bouqouetRouter)

module.exports = mainRouter
