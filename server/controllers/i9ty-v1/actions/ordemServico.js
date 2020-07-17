const ControllerBase = imp('_base/ControllerBase')
const { OrdemServico } = imp('models')
const utils = require('./utils')

class OrdemServicoAction extends ControllerBase {
  async findAll() {
        try {
            const { dataEmissao, codigoIbge, dataColeta, horaLimite, status, localColeta, localEntrega, nomeSolicitante, codigoRemetente } = utils.getRequestValues(this.request)
            const ordensServicos = await OrdemServico.findAll({
                where: { dataEmissao: dataEmissao },
                attributes: [ 'id', 'horaCriacao', 'localEmissaoCodIbge', 'localEmissaoDesc', 'dataColeta' ]
            })

            this.response.json({
                ordensServicos,
                homePage: 'funcionarios',
            })
        } catch (error) {
          this.response.sendError(error)
        }
    }
}

module.exports = OrdemServicoAction
