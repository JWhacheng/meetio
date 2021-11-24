const { check, validationResult } = require('express-validator')
const Users = require('../models/Users')
const emailHelper = require('../helpers/email')

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

    // Create confirmation URL
    const url = `http://${req.headers.host}/account-confirmation/${user.email}`

    // Send confirmation email
    await emailHelper.sendEmail({
      user,
      url,
      subject: 'Meetio - Confirm your account',
      template: 'account-confirmation'
    })

    // Flash message and redirect
    req.flash('exito', 'We have sent a confirmation request to your email')
    res.redirect('/signin')
  } catch (error) {
    console.log(error)
    const sequelizeErrors = error.errors.map(err => err.message)
    const expressErrors = errExp.array().map(err => err.msg)
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