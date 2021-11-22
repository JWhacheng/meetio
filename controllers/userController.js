const Users = require('../models/Users')

exports.getSignup = (req, res) => {
  res.render('signup', {
    pageName: 'Signup',
  })
}

exports.postSignup = async (req, res) => {
  const data = req.body

  const user = await Users.create(data)

  // TODO: Flash message and redirect
  console.log('User created', user)
}