const i18n = imp('helpers/i18n')

global.ServerError = class ServerError extends Error {
  constructor (code, params, language = process.env.LANGUAGE, error) {
    super(code)
    this.$code = code
    this.$error = error
    this.$params = params
    this.$message = i18n().message(code, params)
  }
}
