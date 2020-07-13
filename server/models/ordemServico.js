const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const OrdemServicoModel = sequelize.define('OrdemServico', {
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
    idMapaViagem: {
      field: 'id_mapa_viagem',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    localEmissaoCodIbge: {
      field: 'local_emissao_cod_ibge',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    localEmissaoDesc: {
      field: 'local_emissao_desc',
      type: DataTypes.STRING,
      allowNull: true
    },
    dataColeta: {
      field: 'data_coleta',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('dataColeta')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('dataColeta', value)
        }
      },
      allowNull: true
    },
    horaLimite: {
      field: 'hora_limite',
      type: DataTypes.STRING,
      allowNull: true
    },
    localColeta: {
      field: 'local_coleta',
      type: DataTypes.STRING,
      allowNull: true
    },
    localEntrega: {
      field: 'local_entrega',
      type: DataTypes.STRING,
      allowNull: true
    },
    horaChamada: {
      field: 'hora_chamada',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomeSolicitante: {
      field: 'nome_solicitante',
      type: DataTypes.STRING,
      allowNull: true
    },
    idRemetente: {
      field: 'id_remetente',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nomeRemetenteContatoResponsavel: {
      field: 'nome_remetente_contato_responsavel',
      type: DataTypes.STRING,
      allowNull: true
    },
    idDestinatario: {
      field: 'id_destinatario',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nomeDestinatarioContatoResponsavel: {
      field: 'nome_destinatario_contato_responsavel',
      type: DataTypes.STRING,
      allowNull: true
    },
    idVeiculoPrincipal: {
      field: 'id_veiculo_principal',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kmSaida: {
      field: 'km_saida',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    horarioSaida: {
      field: 'horario_saida',
      type: DataTypes.STRING,
      allowNull: true
    },
    idMotorista: {
      field: 'id_motorista',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    chapa: {
      field: 'chapa',
      type: DataTypes.STRING,
      allowNull: true
    },
    idDadosOpcionais: {
      field: 'id_dados_opcionais',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tb_ordem_servico',
    timestamps: false
  })

  OrdemServicoModel.appDefinitions = {
    autoCrud: true,
    associations: {
      mercadorias: {
        from: 'id',
        to: 'Mercadorias',
        toColumn: 'id_ordem_servico',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      mapaViagem: {
        from: 'id_mapa_viagem',
        to: 'MapaViagem',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      remetente: {
        from: 'id_remetente',
        to: 'ClienteOuFornecedor',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      destinatario: {
        from: 'id_destinatario',
        to: 'ClienteOuFornecedor',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      veiculoPrincipal: {
        from: 'id_veiculo_principal',
        to: 'Veiculos',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      motorista: {
        from: 'id_motorista',
        to: 'Motorista',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      dadosOpcionais: {
        from: 'id_dados_opcionais',
        to: 'DadosOpcionais',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.ONE_TO_ONE
      }
    }
  }

  return OrdemServicoModel
}
