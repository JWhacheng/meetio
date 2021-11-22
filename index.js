const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const router = require('./routes')

const db = require('./config/db')
db.sync().then(() => console.log('Database connected')).catch((error) => { console.log(error) })

require('dotenv').config({ path: '.env' })

const app = express()

// Initialize EJS - Template Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Views location
app.set('views', path.join(__dirname, './views'))

// Static files
app.use(express.static('public'))

// Middleware (logued user, flash messages, actual date)
app.use((req, res, next) => {
  const date = new Date()
  res.locals.year = date.getFullYear()
  next()
})

// Routing
app.use('/', router())

app.listen(process.env.PORT, () => {
  console.log('The server is running')
})