const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
    const DadosOpcionaisModel = sequelize.define('DadosOpcionais', {
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
      seguradora: {
        field: 'seguradora',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroApolice: {
        field: 'numero_apolice',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroContainer: {
        field: 'numero_container',
        type: DataTypes.STRING,
        allowNull: true
      },
      tipoContainer: {
        field: 'tipo_container',
        type: DataTypes.STRING,
        allowNull: true
      },
      navio: {
        field: 'navio',
        type: DataTypes.STRING,
        allowNull: true
      },
      armador: {
        field: 'armador',
        type: DataTypes.STRING,
        allowNull: true
      },
      booking: {
        field: 'booking',
        type: DataTypes.STRING,
        allowNull: true
      },
      docAduaneiro: {
        field: 'doc_aduaneiro',
        type: DataTypes.STRING,
        allowNull: true
      },
      diDta: {
        field: 'di_dta',
        type: DataTypes.STRING,
        allowNull: true
      },
      agencia: {
        field: 'agencia',
        type: DataTypes.STRING,
        allowNull: true
      },
      porto: {
        field: 'porto',
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
        tableName: 'tb_dados_opcionais',
        timestamps: false
    })

    DadosOpcionaisModel.appDefinitions = {
        autoCrud: true,
        associations: {

        }
    }
    
    return DadosOpcionaisModel
}
    