const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const ServicosProdutosModel = sequelize.define('ServicosProdutos', {
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
    servicoProdutoPrestado: {
      field: 'servico_produto_prestado',
      type: DataTypes.STRING,
      allowNull: true
    },
    horarioAtendimento: {
      field: 'horario_atendimento',
      type: DataTypes.STRING,
      allowNull: true
    },
    idArquivoCartaoCNPJ: {
      field: 'id_arquivo_cartao_cnpj',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idArquivoCopiaAlvaraFuncionamento: {
      field: 'id_arquivo_copia_alvara_funcionamento',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idArquivoComprovanteInscricaoEstadualMunicipal: {
      field: 'id_arquivo_comprovante_insc_est_mun',
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idArquivoFotosEmpresa: {
      field: 'id_arquivo_fotos_empresa',
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'tb_servicos_produtos',
    timestamps: false
  })
  
  ServicosProdutosModel.appDefinitions = {
    autoCrud: false,
    associations: {
      arquivoCartaoCNPJ: {
        from: 'id',
        to: 'Arquivo',
        toColumn: 'id_arquivo_cartao_cnpj',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      arquivoCopiaAlvaraFuncionamento: {
        from: 'id',
        to: 'Arquivo',
        toColumn: 'id_arquivo_copia_alvara_funcionamento',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      arquivoComprovanteInscricaoEstadualMunicipal: {
        from: 'id',
        to: 'Arquivo',
        toColumn: 'id_arquivo_comprovante_insc_est_mun',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
      arquivoFotosEmpresa: {
        from: 'id',
        to: 'Arquivo',
        toColumn: 'id_arquivo_fotos_empresa',
        type: ASSOCIATION_TYPE.MANY_TO_ONE
      },
    }
  }
  
  return ServicosProdutosModel
  }
