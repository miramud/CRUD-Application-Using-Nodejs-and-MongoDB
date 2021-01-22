const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')


dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

// LOG REQUEST
app.use(morgan('tiny'))

// MONGODB CONNECTION
connectDB()

// PARSE REQUEST TO BODY-PARSER
app.use(bodyParser.urlencoded({ extended: true }))

// SET VIEW ENGINE
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'views/ejs'))  //THIS IS ONLY NECESSARY IF YOU HAVE A DIFFERENT FOLDER ASIDE THE VIEWS FOLDER FOR YOUR EJS FILES.

// LOAD ASSET
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/font-awesome', express.static(path.resolve(__dirname, 'assets/fontawesome-free-5.15.2-web/css')))
app.use('/webfonts', express.static(path.resolve(__dirname, 'assets/fontawesome-free-5.15.2-web/webfonts')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))


// LOAD ROUTERS
app.use('/', require('./server/routes/router'))


app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
})