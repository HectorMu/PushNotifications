require('dotenv').config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const { supportedContentEncodings } = require('web-push')

const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())



//routes
app.use(require('./routes/index'))
//static content
app.use(express.static(path.join(__dirname, 'public')))



let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Server started on port', port)
})
