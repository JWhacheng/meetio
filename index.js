const express = require('express')
const path = require('path')
const router = require('./routes')
require('dotenv').config({ path: '.env' })

const app = express()

// Initialize EJS - Template Engine
app.set('view engine', 'ejs')

// Views location
app.set('views', path.join(__dirname, './views'))

// Static files
app.use(express.static('public'))

// Routing
app.use('/', router())

app.listen(process.env.PORT, () => {
  console.log('The server is listening')
})