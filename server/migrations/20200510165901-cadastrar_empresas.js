'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
      INSERT INTO gestao.tb_empresas (nome, cnpj)
                              values ('CINCO ESTRELAS TRANSPORTES E LOGÍSTICA LTDA', '03.557.321/0001-99');

      INSERT INTO gestao.tb_empresas (nome, cnpj)
                              values ('5 ESTRELAS CMO.E SERV. DE MUDANÇAS LTDA', '11.292.432/0001-30');

      INSERT INTO gestao.tb_empresas (nome, cnpj)
                              values ('AMERICA GLOBAL COM. E TRANSPORTES LTDA', '32.915.001/00001-52');

      INSERT INTO gestao.tb_empresas (nome, cnpj)
                              values ('BENITEZ JOSE DA SILVA', '');

      INSERT INTO gestao.tb_empresas (nome, cnpj)
                              values ('JH SILVA IMOVEIS EIRELLI', '28.787.946/0001-69');

      INSERT INTO gestao.tb_empresas (nome, cnpj)
                              values ('CURINGA TRANSPORTADORA EIRELI', '26.481.815/0001-23');
      `
    )
  }

}
