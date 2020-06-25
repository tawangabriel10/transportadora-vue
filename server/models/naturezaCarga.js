const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const NaturezaCargaModel = sequelize.define('NaturezaCarga', {
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
    idControleNaturezaCarga: {
      field: 'id_controle_natureza_carga',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
      allowNull: true
    },
    especie: {
      field: 'especie',
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoExterno: {
      field: 'codigo_externo',
      type: DataTypes.STRING,
      allowNull: true
    },
    codigoHarmonizado: {
      field: 'codigo_harmonizado',
      type: DataTypes.STRING,
      allowNull: true
    },
    valorDiarioArmazenagem: {
      field: 'valor_diario_armazenagem',
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'tb_natureza_carga',
    timestamps: false
  })

  NaturezaCargaModel.appDefinitions = {
    autoCrud: true,
    associations: {
      controleNaturezaCarga: {
        from: 'id_controle_natureza_carga',
        to: 'ControleNaturezaCarga',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      naturezaCargaAtributos: {
        from: 'id',
        to: 'NaturezaCargaAtributo',
        toColumn: 'id_natureza_carga',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      mercadorias: {
        from: 'id',
        to: 'Mercadorias',
        toColumn: 'id_natureza_carga',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }

  return NaturezaCargaModel
}
