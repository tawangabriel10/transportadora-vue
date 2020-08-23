const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const PropostaModel = sequelize.define('Proposta', {
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
    numProposta: {
      field: 'num_proposta',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    situacao: {
      field: 'situacao',
      type: DataTypes.STRING,
      allowNull: true
    },
    validade: {
      field: 'validade',
      type: DataTypes.DATE,
      get () {
        const value = this.getDataValue('validade')
        return value ? moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY') : null
      },
      set (value) {
        if (value) {
          value = moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
          this.setDataValue('validade', value)
        }
      },
      allowNull: true
    },
    descricaoServico: {
      field: 'descricao_servico',
      type: DataTypes.STRING,
      allowNull: true
    },
    idCliente: {
      field: 'id_cliente',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idClienteCalculo: {
      field: 'id_cliente_calculo',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    origem: {
      field: 'origem',
      type: DataTypes.STRING,
      allowNull: true
    },
    destino: {
      field: 'destino',
      type: DataTypes.STRING,
      allowNull: true
    },
    unidadeMedida: {
      field: 'unidade_medida',
      type: DataTypes.STRING,
      allowNull: true
    },
    valorUnidadeMedida: {
      field: 'valor_unidade_medida',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    km: {
      field: 'km',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    indice: {
      field: 'indice',
      type: DataTypes.STRING,
      allowNull: true
    },
    valorSeguro: {
      field: 'valor_seguro',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    porcentagemSeguro: {
      field: 'porcentagem_seguro',
      type: DataTypes.STRING,
      allowNull: true
    },
    coeficiente: {
      field: 'coeficiente',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total: {
      field: 'total',
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    tableName: 'tb_proposta',
    timestamps: false
  })
  
  PropostaModel.appDefinitions = {
    autoCrud: true,
    associations: {
      cliente: {
        from: 'id_cliente',
        to: 'ClienteOuFornecedor',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      clienteCalculo: {
        from: 'id_cliente_calculo',
        to: 'ClienteOuFornecedor',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }
  
  return PropostaModel
  }
