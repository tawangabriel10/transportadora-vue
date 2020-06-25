const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const MotoristaModel = sequelize.define('Motorista', {
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
    cpf: {
      field: 'cpf',
      type: DataTypes.STRING,
      allowNull: true
    },
    rg: {
      field: 'rg',
      type: DataTypes.STRING,
      allowNull: true
    },
    rgUf: {
      field: 'rg_uf',
      type: DataTypes.STRING,
      allowNull: true
    },
    dataEmissao: {
      field: 'data_emissao',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('dataEmissao')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('dataEmissao', value)
        }
      },
      allowNull: true
    },
    orgaoExpeditor: {
      field: 'orgao_expeditor',
      type: DataTypes.STRING,
      allowNull: true
    },
    dataNascimento: {
      field: 'data_nascimento',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('dataNascimento')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('dataNascimento', value)
        }
      },
      allowNull: true
    },
    naturalidade: {
      field: 'naturalidade',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomeMae: {
      field: 'nome_mae',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomePai: {
      field: 'nome_pai',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomeContato: {
      field: 'nome_contato',
      type: DataTypes.STRING,
      allowNull: true
    },
    cnh: {
      field: 'cnh',
      type: DataTypes.STRING,
      allowNull: true
    },
    categoriaCnh: {
      field: 'categoria_cnh',
      type: DataTypes.STRING,
      allowNull: true
    },
    cnhDataValidade: {
      field: 'cnh_data_validade',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('cnhDataValidade')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('cnhDataValidade', value)
        }
      },
      allowNull: true
    },
    cnhData1Emissao: {
      field: 'cnh_data_1_emissao',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('cnhData1Emissao')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('cnhData1Emissao', value)
        }
      },
      allowNull: true
    },
    cnhDataEmissao: {
      field: 'cnh_data_emissao',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('cnhDataEmissao')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('cnhDataEmissao', value)
        }
      },
      allowNull: true
    },
    cnhNRenach: {
      field: 'cnh_n_renach',
      type: DataTypes.STRING,
      allowNull: true
    },
    cnhOrgaoEmissor: {
      field: 'cnh_orgao_emissor',
      type: DataTypes.STRING,
      allowNull: true
    },
    cnhUf: {
      field: 'cnh_uf',
      type: DataTypes.STRING,
      allowNull: true
    },
    cep: {
      field: 'cep',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoGeradoPeloCep: {
      field: 'endereco_gerado_pelo_cep',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoCodigoIbge: {
      field: 'endereco_codigo_ibge',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoGeradoUf: {
      field: 'endereco_gerado_uf',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoGeradoCidade: {
      field: 'endereco_gerado_cidade',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoBairro: {
      field: 'endereco_bairro',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoNumero: {
      field: 'endereco_numero',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    enderecoComplemento: {
      field: 'endereco_complemento',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoReferencia: {
      field: 'endereco_referencia',
      type: DataTypes.STRING,
      allowNull: true
    },
    telefone: {
      field: 'telefone',
      type: DataTypes.STRING,
      allowNull: true
    },
    telefoneCelular: {
      field: 'telefone_celular',
      type: DataTypes.STRING,
      allowNull: true
    },
    sexo: {
      field: 'sexo',
      type: DataTypes.STRING,
      allowNull: true
    },
    estadoCivil: {
      field: 'estado_civil',
      type: DataTypes.STRING,
      allowNull: true
    },
    dataContratacao: {
      field: 'data_contratacao',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('dataContratacao')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('dataContratacao', value)
        }
      },
      allowNull: true
    },
    dataDesligamento: {
      field: 'data_desligamento',
      type: DataTypes.DATEONLY,
      get () {
        const value = this.getDataValue('dataDelisgamento')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('dataDelisgamento', value)
        }
      },
      allowNull: true
    },
    situacao: {
      field: 'situacao',
      type: DataTypes.STRING,
      allowNull: true
    },
    numeroInss: {
      field: 'numero_inss',
      type: DataTypes.STRING,
      allowNull: true
    },
    nDependentes: {
      field: 'n_dependentes',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    nomeContato1: {
      field: 'nome_contato_1',
      type: DataTypes.STRING,
      allowNull: true
    },
    telefoneContato1: {
      field: 'telefone_contato1',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomeContato2: {
      field: 'nome_contato_2',
      type: DataTypes.STRING,
      allowNull: true
    },
    telefoneContato2: {
      field: 'telefone_contato2',
      type: DataTypes.STRING,
      allowNull: true
    },
    dadosSeguroPessoa: {
      field: 'dados_seguro_pessoa',
      type: DataTypes.STRING,
      allowNull: true
    },
    observacoes: {
      field: 'observacoes',
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tb_motorista',
    timestamps: false
  })

  MotoristaModel.appDefinitions = {
    autoCrud: true,
    associations: {
      veiculos: {
        from: 'id',
        to: 'Veiculos',
        toColumn: 'id_motorista',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      ordemServicos: {
        from: 'id',
        to: 'OrdemServico',
        toColumn: 'id_motorista',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }

  return MotoristaModel
}
