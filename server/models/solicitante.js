const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const SolicitanteModel = sequelize.define('Solicitante', {
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
    }
  }, {
    tableName: 'tb_solicitante',
    timestamps: false
  })
  SolicitanteModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {

    }
  }

  return SolicitanteModel
}
