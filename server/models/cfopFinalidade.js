const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const CFOPFinalidadeModel = sequelize.define('CFOPFinalidade', {
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
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
      allowNull: true
    },
    idCfop: {
      field: 'id_cfop',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'ta_cfop_finalidade',
    timestamps: false
  })

  CFOPFinalidadeModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {
      cfop: {
        from: 'id_cfop',
        to: 'CFOP',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }

  return CFOPFinalidadeModel
}
