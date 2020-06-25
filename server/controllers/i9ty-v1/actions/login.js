const ControllerBase = imp('_base/ControllerBase')

class LoginAction extends ControllerBase {
  async handle () {
    this.response.json(await this.doLogin())
  }
}

module.exports = LoginAction
