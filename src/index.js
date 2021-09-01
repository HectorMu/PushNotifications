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

app.use (function (req, res, next) {
    if (req.secure) {
            // request was via https, so do no special handling
            next();
    } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    }
});


//routes
app.use(require('./routes/index'))
//static content
app.use(express.static(path.join(__dirname, 'public')))


app.listen(3000)
console.log('server listening');