const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const TiposModalidadeClienteFornecedorModel = sequelize.define('TiposModalidadeClienteFornecedor', {
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
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
      allowNull: true
    },
    tipoCliente: {
      field: 'tipo_cliente',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'tb_tipos_modalidade_cliente_fornecedor',
    timestamps: false
  })

  TiposModalidadeClienteFornecedorModel.appDefinitions = {
    autoCrud: true,
    associations: {
      tiposClienteModalidades: {
        from: 'id',
        to: 'ClienteModalidade',
        toColumn: 'id_tipo_modalidade',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }

  return TiposModalidadeClienteFornecedorModel
}
