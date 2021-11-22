const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const router = require('./routes')

// Models and database configuration
const db = require('./config/db')
require('./models/Users')
db.sync().then(() => console.log('Database connected')).catch((error) => { console.log(error) })

// Development variables
require('dotenv').config({ path: '.env' })

// Principal app
const app = express()

// Body parser to read forms
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize EJS - Template Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Views location
app.set('views', path.join(__dirname, './views'))

// Static files
app.use(express.static('public'))

// Enable cookie parser
app.use(cookieParser())
// Create session
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false
}))
// Enable flash messages
app.use(flash())

// Middleware (logued user, flash messages, actual date)
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  const date = new Date()
  res.locals.year = date.getFullYear()
  next()
})

// Routing
app.use('/', router())

app.listen(process.env.PORT, () => {
  console.log('The server is running')
})