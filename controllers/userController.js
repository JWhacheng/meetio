const { check, validationResult } = require('express-validator')
const Users = require('../models/Users')

exports.getSignup = (req, res) => {
  res.render('signup', {
    pageName: 'Signup',
  })
}

exports.postSignup = async (req, res) => {
  const data = req.body

  const rules = [
    check('repassword').not().isEmpty().withMessage('Retype password must be filled').escape(),
    check('repassword').equals(data.password).withMessage('The passwords are different').escape()
  ]

  // Read express errors
  await Promise.all(rules.map(validation => validation.run(req)))
  const errExp = validationResult(req)

  try {
    const user = await Users.create(data)

    // Flash message and redirect
    req.flash('exito', 'We have sent a confirmation request to your email')
    res.redirect('/signin')
  } catch (error) {
    const sequelizeErrors = error.errors.map(err => err.message)
    const expressErrors = errExp.array().map(err => err.msg);
    const errorsList = [...sequelizeErrors, expressErrors]
    req.flash('error', errorsList)
    res.redirect('/signup')
  }
}

exports.getSignin = (req, res) => {
  res.render('signin', {
    pageName: 'Signin'
  })
}