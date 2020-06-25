const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const ClienteModalidadeModel = sequelize.define('ClienteModalidade', {
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
    idTipoModalidade: {
      field: 'id_tipo_modalidade',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idCliente: {
      field: 'id_cliente',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'ta_cliente_modalidade',
    timestamps: false
  })

  ClienteModalidadeModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {
      tiposModalidadeClienteFornecedor: {
        from: 'id_tipo_modalidade',
        to: 'TiposModalidadeClienteFornecedor',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      clienteOuFornecedor: {
        from: 'id_cliente',
        to: 'ClienteOuFornecedor',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }

  return ClienteModalidadeModel
}
