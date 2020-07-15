const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const PagamentoDadosBancariosModel = sequelize.define('PagamentoDadosBancarios', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    horaCriacao: {
      field: 'hora_criacao',
      type: DataTypes.DATE,
      get () {
        const value = this.getDataValue('horaCriacao')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('horaCriacao', value)
        }
      },
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    razaoSocial: {
      field: 'razao_social',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    cnpj: {

    },
    formasDePagamento: {

    },
    agencia: {

    },
    contaCorrente: {

    },
    banco: {

    },
    numeroBanco: {

    },
    cidadeAgencia: {

    },
    ufConta: {

    },
    modalidade: {

    },
    tipoContribuinte: {
        
    }
}, {
  tableName: 'tb_pagamento_dados_bancarios',
  timestamps: false
})

PagamentoDadosBancariosModel.appDefinitions = {
  autoCrud: true,
  associations: {
    naturezaCarga: {
      from: 'id_natureza_carga',
      to: 'NaturezaCarga',
      toColumn: 'id',
      type: ASSOCIATION_TYPE.MANY_TO_ONE
    },
    ordemServico: {
      from: 'id_ordem_servico',
      to: 'OrdemServico',
      toColumn: 'id',
      type: ASSOCIATION_TYPE.MANY_TO_ONE
    }
  }
}

return PagamentoDadosBancariosModel
}