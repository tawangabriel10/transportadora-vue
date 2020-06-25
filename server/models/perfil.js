const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')

module.exports = function (sequelize, DataTypes) {
  const perfil = sequelize.define('Perfil', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'tb_perfil',
    timestamps: false
  })
  perfil.appDefinitions = {
    autoCrud: true,
    associations: {
      perfilAcessos: {
        from: 'id',
        to: 'PerfilAcessos',
        toColumn: 'id_perfil',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      usuarios: {
        from: 'id',
        to: 'Usuarios',
        toColumn: 'id_perfil',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }
  return perfil
}
