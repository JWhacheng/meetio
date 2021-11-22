const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')

module.exports = function() {
  router.get('/', homeController.home)

  router.get('/signup', userController.getSignup)
  router.post('/signup', userController.postSignup)

  router.get('/signin', userController.getSignin)

  return router
}