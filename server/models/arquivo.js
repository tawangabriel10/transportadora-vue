const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const ArquivoModel = sequelize.define('Arquivo', {
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
    descricao: {
      field: 'descricao',
      type: DataTypes.STRING,
      allowNull: true
    },
    arquivoBase: {
        field: 'arquivo_base',
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo: {
        field: 'tipo',
        type: DataTypes.STRING,
        allowNull: true
    },
    tamanho: {
        field: 'tamanho',
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'tb_arquivo',
    timestamps: false
  })
  
  ArquivoModel.appDefinitions = {
    autoCrud: false,
    associations: {
  
    }
  }
  
  return ArquivoModel
  }