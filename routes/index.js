const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')

module.exports = function() {
  router.get('/', homeController.home)

  router.get('/signup', userController.formSignup)

  return router
}