const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
// const moment = require('moment')
// const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')

module.exports = (sequelize, DataTypes) => {
  const EmpresasModel = sequelize.define('Empresas', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
      allowNull: false
    },
    cnpj: {
      field: 'cnpj',
      type: DataTypes.STRING,
      allowNull: false
    },
    inscricaoEstadual: {
      field: 'inscricao_estadual',
      type: DataTypes.STRING,
      allowNull: true
    },
    endereco: {
      field: 'endereco',
      type: DataTypes.STRING,
      allowNull: true
    },
    cep: {
      field: 'cep',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'tb_empresas'
  })
  EmpresasModel.appDefinitions = {
    autoCrud: true,
    authRequired: false,
    associations: {
      empresasEntidades: {
        from: 'id',
        to: 'EmpresasEntidades',
        toColumn: 'id_empresa',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }
  return EmpresasModel
}
