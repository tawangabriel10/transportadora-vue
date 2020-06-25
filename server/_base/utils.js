const jwt = require('jsonwebtoken')
const { Usuarios, Perfil } = imp('models')
const PRIVATE_KEY = 'i9ty-yt9i-t9iy'

const utils = {
  validateUser: async (request) => {
    try {
      if (/login/i.test(request.originalUrl)) {
        return true
      }
      const requestValues = utils.getRequestValues(request)
      let { token } = requestValues
      if (!token) {
        token = request.headers['authentication-token']
      }
      if (!token) {
        token = requestValues['authentication-token']
      }
      if (!token) {
        throw new Error('Token Obrigatório')
      }
      // { idPerfil, situacao, id, username }
      const fromToken = await jwt.verify(token, PRIVATE_KEY)
      request.userFromToken = {
        ...fromToken,
        usuario: await Usuarios.findOne({ where: { id: fromToken.id } }),
        perfil: await Perfil.findOne({ where: { id: fromToken.idPerfil } })
      }
      return true
    } catch (error) {
      throw new UnathorizedError(error.message)
    }
  },

  getRequestValues: (request) => {
    return { ...(request.body || {}), ...(request.query || {}) }
  },

  replaceModelsFromInclude: (include, models) => {
    for (const includeSet of include) {
      if (typeof includeSet.model === 'string') {
        includeSet.model = models[includeSet.model]
      }
      if (includeSet.include) {
        utils.replaceModelsFromInclude(includeSet.include, models)
      }
    }
  },

  mapRoutesPossibilities: [
    ['GET_ALL', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.get(`/${modelNameForRoute}`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.getAll, modelName, CurrentModel, models))
    }],
    ['EXPORT_ALL', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.get(`/${modelNameForRoute}/export/:format?`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.exportRows, modelName, CurrentModel, models))
    }],
    ['STREAM_ONE', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.get(`/${modelNameForRoute}/:id/stream/:fieldName`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.streamOne, modelName, CurrentModel, models))
    }],
    ['GET_ONE', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.get(`/${modelNameForRoute}/:id`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.getOne, modelName, CurrentModel, models))
    }],
    ['INSERT_ONE', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.post(`/${modelNameForRoute}`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.insertOne, modelName, CurrentModel, models))
    }],
    ['UPDATE_ONE', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.put(`/${modelNameForRoute}/:id`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.updateOne, modelName, CurrentModel, models))
    }],
    ['DELETE_ONE', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.delete(`/${modelNameForRoute}/:id`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.deleteOne, modelName, CurrentModel, models))
    }],
    ['DELETE_ALL', ({ router, modelNameForRoute, wrapper, handler, validateAuthorization, modelName, models, CurrentModel }) => {
      router.delete(`/${modelNameForRoute}`,
        wrapper(handler, handler.validateAuthentication, modelName, CurrentModel, models),
        validateAuthorization,
        wrapper(handler, handler.deleteAll, modelName, CurrentModel, models))
    }]
  ]
}

module.exports = utils
