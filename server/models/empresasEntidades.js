const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')

module.exports = (sequelize, DataTypes) => {
  const EmpresasEntidadesModel = sequelize.define('EmpresasEntidades', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    idEmpresa: {
      field: 'id_empresa',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modelName: {
      field: 'model_name',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEntity: {
      field: 'id_entity',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'ta_empresas_entidades'
  })
  EmpresasEntidadesModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {
      empresa: {
        from: 'id_empresa',
        to: 'Empresas',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }
  return EmpresasEntidadesModel
}
