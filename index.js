require('dotenv').config()

const express = require('express')
const mainRouter = require('./src/router/main')
const app = express()
const port = 3000


const urlEncode = express.urlencoded({
    extended : true
})

app.use(urlEncode)

app.use('/api/v1/',mainRouter)

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})