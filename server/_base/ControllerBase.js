const typesValidator = require('./typesValidator')
const jwt = require('jsonwebtoken')
const conversor = imp('helpers/conversor')
const { Usuarios, Perfil, PerfilAcessos } = imp('models')
const PRIVATE_KEY = 'i9ty-yt9i-t9iy'
const utils = require('./utils')
const HandlerCustomRouter = require('./HandlerCustomRouter')

class ControllerBase {
  constructor (routeConfig, req, res, next) {
    this.request = req
    this.response = res
    this.next = next
    this.routeConfig = routeConfig
  }
  castParams (values = utils.getRequestValues(this.request)) {
    return typesValidator.cast(this.routeConfig.params, values)
  }
  validateParams (values = { ...(this.request.body || {}), ...(this.request.query || {}) }) {
    typesValidator.validate(this.routeConfig.params, values)
  }
  async handle () {
    throw new ServerError('MESSAGE_METHOD_MANDATORY', ['handle'])
  }
  async validateUser () {
    return utils.validateUser(this.request)
  }
  async doLogin () {
    try {
      const { username, password } = utils.getRequestValues(this.request)
      const usuario = await Usuarios.findOne({
        where: { nomeUsuario: username },
        attributes: [ 'senha', 'nomeUsuario', 'id', 'idPerfil', 'situacao' ]
      })

      if (!usuario) {
        throw new ServerError('NOT_EXISTS', [username, 'Usuários'])
      }

      const { senha: hash, idPerfil, situacao, id } = usuario

      if (situacao !== 'ATIVO') {
        throw new ServerError('USER_INATIVO')
      }

      if (conversor.compareCrypt(password, hash)) {
        const perfil = await Perfil.findOne({
          where: { id: idPerfil },
          include: [
            {
              as: 'perfilAcessos',
              model: PerfilAcessos
            }
          ]
        })
        return {
          perfil,
          usuario,
          homePage: 'funcionarios',
          token: await jwt.sign({ idPerfil, situacao, id, username }, PRIVATE_KEY)
        }
      } else {
        throw new ServerError('INVALID_ACESS')
      }
    } catch (error) {
      this.response.sendError(error)
    }
  }
}

/**
 * @param models
 * @param validateAuthorization Função pode ser definida por este argumento, porém será priorizado às models que implementar esta função em suas 'appDefinitions'
 * @returns {Function}
 */
ControllerBase.baseCustomRouterModels = (models, { validateAuthorization } = {}) => {
  return (router, appExpress) => {
    const wrapper = (handler, fn, modelName, Model, models) => {
      return async (req, res, next) => {
        try {
          req.$controllerBaseOptions = { modelName, Model, models }
          const result = await fn.apply(handler, [req, res, next, modelName, Model])
          if (result !== void 0) {
            res.json(result)
          }
        } catch (error) {
          res.sendError(error)
        }
      }
    }

    for (const modelName in models) {
      if (!models.hasOwnProperty(modelName)) {
        continue
      }
      // CRUD
      const Model = models[modelName]
      if (!Model.__isModel) {
        continue
      }
      if (!Model.appDefinitions.autoCrud) {
        continue
      }

      let fnValidateAuthorization = validateAuthorization || ((req, res, next) => next())

      if (Model.appDefinitions.validateAuthorization) {
        fnValidateAuthorization = Model.appDefinitions.validateAuthorization
      }

      const handler = new HandlerCustomRouter(Model, models)
      const modelNameForRoute = modelName.replace(/(^.)/, (a, b) => b.toLowerCase())

      for (const [type, fn] of utils.mapRoutesPossibilities) {
        if (Model.appDefinitions.onlyTypeRoutes && Model.appDefinitions.onlyTypeRoutes.indexOf(type) === -1) {
          continue
        }
        fn({ router, modelNameForRoute, wrapper, handler, validateAuthorization: fnValidateAuthorization, modelName, models, CurrentModel: Model })
      }
    }
  }
}

module.exports = ControllerBase
