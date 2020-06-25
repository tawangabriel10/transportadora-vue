const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const TipoVeiculoModel = sequelize.define('TipoVeiculo', {
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
      allowNull: false
    }
  }, {
    tableName: 'td_tipo_veiculo',
    timestamps: false
  })

  TipoVeiculoModel.appDefinitions = {
    autoCrud: true,
    associations: {
      veiculos: {
        from: 'id',
        to: 'Veiculos',
        toColumn: 'id_tipo_veiculo',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      veiculosVinculados: {
        from: 'id',
        to: 'VeiculosVinculados',
        toColumn: 'id_tipo_veiculo',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }

  return TipoVeiculoModel
}
