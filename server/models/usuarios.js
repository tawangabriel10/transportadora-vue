const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const conversor = imp('helpers/conversor')

module.exports = function (sequelize, DataTypes) {
  const usuarios = sequelize.define('Usuarios', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    senha: {
      field: 'senha',
      type: DataTypes.TEXT,
      allowNull: true,
      set (value) {
        const hash = conversor.encrypt(value)
        this.setDataValue('senha', hash)
      }
    },
    nomeUsuario: {
      field: 'nome_usuario',
      type: DataTypes.STRING,
      allowNull: true
    },
    idPerfil: {
      field: 'id_perfil',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    situacao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'tb_usuarios',
    timestamps: false
  })
  usuarios.appDefinitions = {
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
  return usuarios
}
