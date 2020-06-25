const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const CFOPModel = sequelize.define('CFOP', {
    id: {
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
    codigoCfop: {
      field: 'codigo_cfop',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    naturezaOperacao: {
      field: 'natureza_operacao',
      type: DataTypes.STRING,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ativo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigoContabil: {
      field: 'codigo_contabil',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'tb_cfop',
    timestamps: false
  })

  CFOPModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {
      finalidades: {
        from: 'id',
        to: 'CFOPFinalidade',
        toColumn: 'id_cfop',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      clientesOuFornecedores: {
        from: 'id',
        to: 'ClienteOuFornecedor',
        toColumn: 'id_cfop',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }

  return CFOPModel
}
