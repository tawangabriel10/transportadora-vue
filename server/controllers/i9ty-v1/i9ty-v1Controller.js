const ControllerBase = require('../../_base/ControllerBase')
const HttpMethods = imp('enum/HttpMethods')
const models = imp('models')

module.exports = {
  basePath: '/i9ty-v1',
  customFunction: ControllerBase.baseCustomRouterModels(models),
  requestMapping: [
    {
      action: 'login',
      path: '/login',
      description: 'Rota reponsável por validar autenticação de ingresso no sistema',
      methods: [HttpMethods.POST],
      params: {
        username: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        }
      }
    },
    {
      action: 'ordemServico',
      path: '/ordem-servico',
      description: 'Rota reponsável por consultar ordem de serviço',
      methods: [HttpMethods.GET],
      params: {
        dataEmissao: {
          type: 'string',
          required: false
        },
        codigoIbge: {
          type: 'string',
          required: false
        }
      }
    }
  ]
}
