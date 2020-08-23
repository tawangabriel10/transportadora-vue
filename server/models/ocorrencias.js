const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const OcorrenciasModel = sequelize.define('Ocorrencias', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dataHoraCriacao: {
      field: 'data_hora_criacao',
      type: DataTypes.DATE,
      get () {
        const value = this.getDataValue('dataHoraCriacao')
        return value ? moment(value, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY hh:mm:ss') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss')
          this.setDataValue('dataHoraCriacao', value)
        }
      },
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    tipo: {
      field: 'tipo',
      type: DataTypes.STRING,
      allowNull: true
    },
    descricao: {
      field: 'descricao',
      type: DataTypes.STRING,
      allowNull: true
    },
    idArquivo: {
      field: 'id_arquivo',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idUsuario: {
      field: 'id_usuario',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idOrdemServico: {
      field: 'id_ordem_servico',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tb_ocorrencias',
    timestamps: false
  })
  OcorrenciasModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {
        arquivo: {
            from: 'id_arquivo',
            to: 'Arquivo',
            toColumn: 'id',
            type: ASSOCIATION_TYPE.ONE_TO_ONE
        },
        usuario: {
            from: 'id_usuario',
            to: 'Usuarios',
            toColumn: 'id',
            type: ASSOCIATION_TYPE.ONE_TO_ONE
        },
        arquivo: {
            from: 'id_ordem_servico',
            to: 'OrdemServico',
            toColumn: 'id',
            type: ASSOCIATION_TYPE.MANY_TO_ONE
        }
    }
  }

  return OcorrenciasModel
}
