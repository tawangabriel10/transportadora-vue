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
      type: DataTypes.STRING,
      allowNull: true
    },
    cnpj: {
      field: 'cnpj',
      type: DataTypes.STRING,
      allowNull: true
    },
    formasDePagamento: {
      field: 'formas_de_pagamento',
      type: DataTypes.STRING,
      allowNull: true
    },
    agencia: {
      field: 'agencia',
      type: DataTypes.STRING,
      allowNull: true
    },
    contaCorrente: {
      field: 'conta_corrente',
      type: DataTypes.STRING,
      allowNull: true
    },
    banco: {
      field: 'banco',
      type: DataTypes.STRING,
      allowNull: true
    },
    numeroBanco: {
      field: 'numero_banco',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cidadeAgencia: {
      field: 'cidade_agencia',
      type: DataTypes.STRING,
      allowNull: true
    },
    ufConta: {
      field: 'uf_conta',
      type: DataTypes.STRING,
      allowNull: true
    },
    modalidade: {
      field: 'modalidade',
      type: DataTypes.STRING,
      allowNull: true
    },
    tipoContribuinte: {
      field: 'tipo_contribuinte',
      type: DataTypes.STRING,
      allowNull: true
    }
}, {
  tableName: 'tb_pagamento_dados_bancarios',
  timestamps: false
})

PagamentoDadosBancariosModel.appDefinitions = {
  autoCrud: false,
  associations: {

  }
}

return PagamentoDadosBancariosModel
}