'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
        alter table gestao.tb_ordem_servico rename column redespacho to valor_redespacho;
    `)
  }

}
