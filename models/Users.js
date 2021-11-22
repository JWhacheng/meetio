const { Sequelize } = require('sequelize')
const bcrypt = require('bcrypt-nodejs')
const db = require('../config/db')

const Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING(60),
  image: Sequelize.STRING(60),
  email: {
    type: Sequelize.STRING(30),
    allowNull: false,
    validate: {
      isEmail: { msg: 'The email is not valid' }
    },
    unique: {
      args: true,
      msg: 'The email is already registered'
    }
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'The password must be filled' }
    }
  },
  active: {
    type: Sequelize.INTEGER(1),
    defaultValue: 0,
  },
  tokenPassword: Sequelize.STRING,
  expiredToken: Sequelize.DATE,
}, {
  hooks: {
    beforeCreate(user) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }
  }
})

// Compare password method
Users.prototype.validatePassword = (password) => {
  return bcrypt.compareSync(password, this.password)
}

module.exports = Users