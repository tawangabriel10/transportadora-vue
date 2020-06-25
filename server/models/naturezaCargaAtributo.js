const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const NaturezaCargaAtributoModel = sequelize.define('NaturezaCargaAtributo', {
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
    valor: {
      field: 'valor',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    idNaturezaCarga: {
      field: 'id_natureza_carga',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tb_natureza_carga_atributo',
    timestamps: false
  })
  NaturezaCargaAtributoModel.appDefinitions = {
    autoCrud: true,
    associations: {
      naturezaCarga: {
        from: 'id_natureza_carga',
        to: 'NaturezaCarga',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }

  return NaturezaCargaAtributoModel
}
