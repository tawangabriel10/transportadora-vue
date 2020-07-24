const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const FreteModel = sequelize.define('Frete', {
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
    valorFrete: {
        field: 'valor_frete',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    pedagio: {
        field: 'pedagio',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    adValoragem: {
        field: 'ad_valoragem',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    seguro: {
        field: 'seguro',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    outros: {
        field: 'outros',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    taxaAerea: {
        field: 'taxa_aerea',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    taxaColeta: {
        field: 'taxa_coleta',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    taxaEntrega: {
        field: 'taxa_entrega',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    valorRedespacho: {
        field: 'valor_redespacho',
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    totalPrestacao: {
        field: 'total_prestacao',
        type: DataTypes.DOUBLE,
        allowNull: true
    }
  }, {
      tableName: 'tb_frete',
      timestamps: false
  })
  FreteModel.appDefinitions = {
      autoCrud: true,
      associations: {
    
      }
    }
    
    return FreteModel
}