const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const { appDefinitions: mixinAppDefinitions } = imp('./_base/mixin-app-definitions')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const ClienteOuFornecedorModel = sequelize.define('ClienteOuFornecedor', {
    id: {
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
    tipoCliente: {
      field: 'tipo_cliente',
      type: DataTypes.STRING,
      allowNull: true
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
    apelido: {
      field: 'apelido',
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
    sexo: {
      field: 'sexo',
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      field: 'status',
      type: DataTypes.INTEGER,
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
    enderecoGeradoEstado: {
      field: 'endereco_gerado_estado',
      type: DataTypes.STRING,
      allowNull: true
    },
    enderecoGeradoPais: {
      field: 'endereco_gerado_pais',
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
    email: {
      field: 'email',
      type: DataTypes.STRING,
      allowNull: true
    },
    emailSecundario: {
      field: 'email_secundario',
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
    nomeContato: {
      field: 'nome_contato',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomeResponsavel: {
      field: 'nome_responsavel',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoResponsavel: {
      field: 'contato_responsavel',
      type: DataTypes.STRING,
      allowNull: true
    },
    cnpj: {
      field: 'cnpj',
      type: DataTypes.STRING,
      allowNull: true
    },
    razaoSocial: {
      field: 'razao_social',
      type: DataTypes.STRING,
      allowNull: true
    },
    nomeFantasia: {
      field: 'nome_fantasia',
      type: DataTypes.STRING,
      allowNull: true
    },
    inscricaoEstadual: {
      field: 'inscricao_estadual',
      type: DataTypes.STRING,
      allowNull: true
    },
    inscricaoMunicipal: {
      field: 'inscricao_municipal',
      type: DataTypes.STRING,
      allowNull: true
    },
    inscricaoSuframa: {
      field: 'inscricao_suframa',
      type: DataTypes.STRING,
      allowNull: true
    },
    contribuicaoIcms: {
      field: 'contribuicao_icms',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoComercial: {
      field: 'contato_comercial',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoFinanceiro: {
      field: 'contato_financeiro',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoTelefoneComercial: {
      field: 'contato_telefone_comercial',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoTelefoneFinanceiro: {
      field: 'contato_telefone_financeiro',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoEmailComercial: {
      field: 'contato_email_comercial',
      type: DataTypes.STRING,
      allowNull: true
    },
    contatoEmailFinanceiro: {
      field: 'contato_email_financeiro',
      type: DataTypes.STRING,
      allowNull: true
    },
    idCfop: {
      field: 'id_cfop',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idPagamentoDadosBancarios: {
      field: 'id_pagamento_dados_bancarios',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idServicosProdutos: {
      field: 'id_servicos_produtos',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tb_cliente_ou_fornecedor',
    timestamps: false
  })

  ClienteOuFornecedorModel.appDefinitions = {
    ...mixinAppDefinitions,
    autoCrud: true,
    associations: {
      clienteModalidades: {
        from: 'id',
        to: 'ClienteModalidade',
        toColumn: 'id_cliente',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      remetenteOrdemServicos: {
        from: 'id',
        to: 'OrdemServico',
        toColumn: 'id_remetente',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      destinatarioOrdemServicos: {
        from: 'id',
        to: 'OrdemServico',
        toColumn: 'id_destinatario',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      consignatarioOrdemServicos: {
        from: 'id',
        to: 'DadosOpcionais',
        toColumn: 'id_consignatario',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      redespachoOrdemServicos: {
        from: 'id',
        to: 'DadosOpcionais',
        toColumn: 'id_redespacho',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      pagamentoDadosBancarios: {
        from: 'id',
        to: 'PagamentoDadosBancarios',
        toColumn: 'id_pagamento_dados_bancarios',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      },
      servicosProdutos: {
        from: 'id',
        to: 'ServicosProdutos',
        toColumn: 'id_servicos_produtos',
        type: ASSOCIATION_TYPE.ONE_TO_MANY
      }
    }
  }

  return ClienteOuFornecedorModel
}
