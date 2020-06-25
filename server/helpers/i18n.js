const fs = require('fs')
const path = require('path')
const locales = {}
const regex = /(\$\{\d+\})/g

const pathI18n = path.resolve(__dirname, '../i18n')
const files = fs.readdirSync(pathI18n)
for (let locale of files) {
  locale = locale.replace(/\.js(.+)?/, '')
  locales[locale] = require('../i18n/' + locale)
}

module.exports = (language = process.env.LANGUAGE) => {
  return {
    message (code, params) {
      let i = -1
      return locales[language][code].replace(regex, () => {
        i += 1
        return params[i]
      })
    }
  }
}
