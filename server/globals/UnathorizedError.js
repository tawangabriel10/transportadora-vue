
global.UnathorizedError = class UnathorizedError extends Error {
  constructor (errorMessage, statusCode = 401, $code, $message) {
    super(errorMessage)
    this.statusCode = statusCode
    this.$code = $code
    this.$message = $message
  }
}
