const fs = require('fs')
const util = require('util')
const ejs = require('ejs')
const nodemailer = require('nodemailer')
const emailConfig = require('../config/email')

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
})

exports.sendEmail = async (options) => {
  // Read email template
  const template = __dirname + `/../views/emails/${options.template}.ejs`

  // Compile email template
  const compiledTemplate = ejs.compile(fs.readFileSync(template, 'utf-8'))

  // Create HTML
  const html = compiledTemplate({ url: options.url })

  // Email options
  const emailOptions = {
    from: 'Meetio <no-reply@meetio.com>',
    to: options.user.email,
    subject: options.subject,
    html
  }

  // Send email
  const sendEmail = util.promisify(transport.sendMail, transport)
  return sendEmail.call(transport, emailOptions)
}
