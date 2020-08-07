const ControllerBase = imp('_base/ControllerBase')
const { OrdemServico } = imp('models')
const utils = imp('_base/utils')

class OrdemServicoAction extends ControllerBase {
  async handle() {
        try {
            const { dataEmissao, codigoIbge, dataColeta, horaLimite, status, localColeta, localEntrega, nomeSolicitante, codigoRemetente } = utils.getRequestValues(this.request)
            const ordensServicos = await OrdemServico.findAll({
                where: {},
                attributes: [ 'id', 'horaCriacao', 'localEmissaoCodIbge', 'localEmissaoDesc', 'dataColeta' ]
            })

            this.response.json({
                ordensServicos,
                homePage: 'GerarOS',
            })
        } catch (error) {
          this.response.sendError(error)
        }
    }
}

module.exports = OrdemServicoAction
