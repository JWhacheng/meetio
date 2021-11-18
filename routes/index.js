const express = require('express')
const router = express.Router()

module.exports = function() {
  router.get('/', (req, res) => {
    res.render('home')
  })

  router.get('/signup', (req, res) => {
    res.render('signup')
  })

  return router
}