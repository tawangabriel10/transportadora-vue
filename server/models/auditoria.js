const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const AuditoriaModel = sequelize.define('Auditoria', {
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
    nomeCadastro: {
      field: 'nome_cadastro',
      type: DataTypes.STRING,
      allowNull: true
    },
    dataCadastro: {
        field: 'data_cadastro',
        type: DataTypes.DATE,
        get () {
          const value = this.getDataValue('dataCadastro')
          return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
        },
        set (value) {
          if (value) {
            value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
            this.setDataValue('dataCadastro', value)
          }
        },
        allowNull: true
    },
    nomeAlterado: {
        field: 'nome_alterado',
        type: DataTypes.STRING,
        allowNull: true
    },
    dataAlterado: {
        field: 'data_alterado',
        type: DataTypes.DATE,
        get () {
          const value = this.getDataValue('dataAlterado')
          return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
        },
        set (value) {
          if (value) {
            value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
            this.setDataValue('dataAlterado', value)
          }
        },
        allowNull: true
    },
    codAutenticacaoEmail: {
        field: 'cod_autenticacao_email',
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'tb_auditoria',
    timestamps: false
})
  
  AuditoriaModel.appDefinitions = {
    autoCrud: true,
    associations: {
  
    }
  }
  
  return AuditoriaModel
}