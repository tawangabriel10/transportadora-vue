const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const MercadoriasModel = sequelize.define('Mercadorias', {
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
    quantidade: {
      field: 'quantidade',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    unidade: {
      field: 'unidade',
      type: DataTypes.STRING,
      allowNull: true
    },
    pesoBrutoKg: {
      field: 'peso_bruto_kg',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    pesoLiquidoKg: {
      field: 'peso_liquido_kg',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    cubagem: {
      field: 'cubagem',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    nNotaFiscal: {
      field: 'n_nota_fiscal',
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
    valorNotaFiscal: {
      field: 'valor_nota_fiscal',
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    idNaturezaCarga: {
      field: 'id_natureza_carga',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    especieVolumeCategoria: {
      field: 'especie_volume_categoria',
      type: DataTypes.STRING,
      allowNull: true
    },
    produtoTransportado: {
      field: 'produto_transportado',
      type: DataTypes.STRING,
      allowNull: true
    },
    tara: {
      field: 'tara',
      type: DataTypes.STRING,
      allowNull: true
    },
    lacre: {
      field: 'lacre',
      type: DataTypes.STRING,
      allowNull: true
    },
    observacoes: {
      field: 'observacoes',
      type: DataTypes.TEXT,
      allowNull: true
    },
    idOrdemServico: {
      field: 'id_ordem_servico',
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'tb_mercadorias',
    timestamps: false
  })

  MercadoriasModel.appDefinitions = {
    autoCrud: true,
    associations: {
      naturezaCarga: {
        from: 'id_natureza_carga',
        to: 'NaturezaCarga',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      ordemServico: {
        from: 'id_ordem_servico',
        to: 'OrdemServico',
        toColumn: 'id',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      }
    }
  }

  return MercadoriasModel
}
