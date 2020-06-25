exports.appDefinitions = {
  authRequired: true,
  validateAuthorization: async (req, res, next) => {
    next()
    // const { userFromToken, $controllerBaseOptions } = req
    // const { models, modelName } = $controllerBaseOptions
    // const { idPerfil } = userFromToken
    // const acesso = await models.PerfilAcessos.findOne({ where: { idPerfil, modelName } })
    // if (acesso) {
    //   next()
    // } else {
    //   res.sendError(new UnathorizedError('Não possui acesso a este módulo', 403))
    // }
  }
}
