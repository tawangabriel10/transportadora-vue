const nodemailer = require('nodemailer')
const enviroment = imp('enviroment')

module.exports = {
  sendEmail: async (to = [], subject = '', html = '') => {
    return new Promise((resolve, reject) => {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          reject(err)
        }
        let transporter = nodemailer.createTransport({
          host: 'smtp.googlemail.com', // Gmail Host
          port: 465, // Port
          secure: true, // this is true as port is 465
          auth: {
            user: enviroment.EMAIL_USER, // Gmail username
            pass: enviroment.EMAIL_PASS // Gmail password
          }
        })

        let mailOptions = {
          from: enviroment.EMAIL_FROM_NO_REPLAY,
          to: to.join(','),
          subject,
          html
        }

        const ID = Date.now()
        console.log(`> Enviando email... ID: ${ID}`, mailOptions)
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error)
          } else {
            console.log(`> Email Enviado! ID: ${ID}`)
            resolve(info)
          }
        })
      })
    })
  }
}
