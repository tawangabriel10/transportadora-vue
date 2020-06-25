const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const VeiculosModel = sequelize.define('Veiculos', {
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
    nome: {
      field: 'nome',
      type: DataTypes.STRING,
      allowNull: true
    },
    placa: {
      field: 'placa',
      type: DataTypes.STRING,
      allowNull: true
    },
    ano: {
      field: 'ano',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    cor: {
      field: 'cor',
      type: DataTypes.STRING,
      allowNull: true
    },
    marcaModelo: {
      field: 'marca_modelo',
      type: DataTypes.STRING,
      allowNull: true
    },
    renavam: {
      field: 'renavam',
      type: DataTypes.STRING,
      allowNull: true
    },
    nChassi: {
      field: 'n_chassi',
      type: DataTypes.STRING,
      allowNull: true
    },
    medCarroceria: {
      field: 'med_carroceria',
      type: DataTypes.STRING,
      allowNull: true
    },
    tara: {
      field: 'tara',
      type: DataTypes.STRING,
      allowNull: true
    },
    capacicidadeKg: {
      field: 'capacicidade_kg',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    capacidadeMCubicos: {
      field: 'capacidade_m_cubicos',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    capacidadeTanque: {
      field: 'capacidade_tanque',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    nEixos: {
      field: 'n_eixos',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    mediaKmLitro: {
      field: 'media_km_litro',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    enderecoCodigoIbge: {
      field: 'endereco_codigo_ibge',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoCidade: {
      field: 'endereco_cidade',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoUf: {
      field: 'endereco_uf',
      type: DataTypes.STRING,
      allowNull: true
    },
    observacoes: {
      field: 'observacoes',
      type: DataTypes.TEXT,
      allowNull: true
    },
    idTipoVeiculo: {
      field: 'id_tipo_veiculo',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idMotorista: {
      field: 'id_motorista',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tb_veiculos',
    timestamps: false
  })
  VeiculosModel.appDefinitions = {
    autoCrud: true,
    associations: {
      tipoVeiculo: {
        from: 'id_tipo_veiculo',
        to: 'TipoVeiculo',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      motorista: {
        from: 'id_motorista',
        to: 'Motorista',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }

  return VeiculosModel
}
