const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')

module.exports = function (sequelize, DataTypes) {
  const perfilAcessos = sequelize.define('PerfilAcessos', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    idPerfil: {
      field: 'id_perfil',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modelName: {
      field: 'model_name',
      type: DataTypes.STRING,
      allowNull: false
    },
    accessRole: {
      field: 'access_role',
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'tb_perfil_acessos',
    timestamps: false
  })
  perfilAcessos.appDefinitions = {
    autoCrud: true,
    associations: {
      perfil: {
        from: 'id_perfil',
        to: 'Perfil',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }
  return perfilAcessos
}
