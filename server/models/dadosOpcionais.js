const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
    const DadosOpcionaisModel = sequelize.define('DadosOpcionais', {
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
      idConsignatario: {
        field: 'id_consignatario',
        type: DataTypes.INTEGER,
        allowNull: true
      },
      nomeConsignatarioResponsavel: {
        field: 'nome_consignatario_responsavel',
        type: DataTypes.STRING,
        allowNull: true
      },
      idRedespacho: {
        field: 'id_redespacho',
        type: DataTypes.INTEGER,
        allowNull: true
      },
      nomeRedespachoResponsavel: {
        field: 'nome_redespacho_responsavel',
        type: DataTypes.STRING,
        allowNull: true
      },
      valorFrete: {
        field: 'valor_frete',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      pedagio: {
        field: 'pedagio',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      adValoragem: {
        field: 'ad_valoragem',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      seguro: {
        field: 'seguro',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      outros: {
        field: 'outros',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      taxaAerea: {
        field: 'taxa_aerea',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      taxaColeta: {
        field: 'taxa_coleta',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      taxaPrestacao: {
        field: 'taxa_prestacao',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      taxaEntrega: {
        field: 'taxa_entrega',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      valorRedespacho: {
        field: 'valor_redespacho',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      dataChegada: {
        field: 'data_chegada',
        type: DataTypes.DATEONLY,
        get () {
          const value = this.getDataValue('dataChegada')
          return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
        },
        set (value) {
          if (value) {
            value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
            this.setDataValue('dataChegada', value)
          }
        },
        allowNull: true
      },
      horaChegada: {
        field: 'hora_chegada',
        type: DataTypes.STRING,
        allowNull: true
      },
      formaPagamento: {
        field: 'forma_pagamento',
        type: DataTypes.STRING,
        allowNull: true
      },
      respPagamento: {
        field: 'resposta_pagamento',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroReferencia: {
        field: 'numero_referencia',
        type: DataTypes.STRING,
        allowNull: true
      },
      valorReferencia: {
        field: 'valor_referencia',
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      conhecimento: {
        field: 'conhecimento',
        type: DataTypes.STRING,
        allowNull: true
      },
      notaFiscal: {
        field: 'nota_fiscal',
        type: DataTypes.STRING,
        allowNull: true
      },
      finalidadeTransporte: {
        field: 'finalidade_transporte',
        type: DataTypes.STRING,
        allowNull: true
      },
      material: {
        field: 'material',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroRisco: {
        field: 'numero_risco',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroONU: {
        field: 'numero_onu',
        type: DataTypes.STRING,
        allowNull: true
      },
      seguradora: {
        field: 'seguradora',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroApolice: {
        field: 'numero_apolice',
        type: DataTypes.STRING,
        allowNull: true
      },
      numeroContainer: {
        field: 'numero_container',
        type: DataTypes.STRING,
        allowNull: true
      },
      tipoContainer: {
        field: 'tipo_container',
        type: DataTypes.STRING,
        allowNull: true
      },
      navio: {
        field: 'navio',
        type: DataTypes.STRING,
        allowNull: true
      },
      armador: {
        field: 'armador',
        type: DataTypes.STRING,
        allowNull: true
      },
      booking: {
        field: 'booking',
        type: DataTypes.STRING,
        allowNull: true
      },
      docAduaneiro: {
        field: 'doc_aduaneiro',
        type: DataTypes.STRING,
        allowNull: true
      },
      diDta: {
        field: 'di_dta',
        type: DataTypes.STRING,
        allowNull: true
      },
      agencia: {
        field: 'agencia',
        type: DataTypes.STRING,
        allowNull: true
      },
      porto: {
        field: 'porto',
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
        tableName: 'tb_dados_opcionais',
        timestamps: false
    })

    DadosOpcionaisModel.appDefinitions = {
        autoCrud: true,
        associations: {
            consignatario: {
                from: 'id_consignatario',
                to: 'ClienteOuFornecedor',
                toColumn: 'id',
                type: ASSOCIATION_TYPE.MANY_TO_ONE
            },
            redespacho: {
                from: 'id_redespacho',
                to: 'ClienteOuFornecedor',
                toColumn: 'id',
                type: ASSOCIATION_TYPE.MANY_TO_ONE
            }
        }
    }
    
    return DadosOpcionaisModel
}
    