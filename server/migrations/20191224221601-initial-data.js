
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
        INSERT INTO gestao.tb_perfil(nome) VALUES ('ADM');
    `)
    await queryInterface.sequelize.query(
      `
                  INSERT INTO gestao.tb_usuarios(senha, nome_usuario, id_perfil, situacao)
                  VALUES ('$2b$10$RmUPVNGj5BUhFF8oFfnxAOmFuF.y4YQ028s5/jERmm4Mq2Z9MCfqK', 'admin',
                          (SELECT id from gestao.tb_perfil WHERE nome='ADM'),
                          'ATIVO'
                          );
          `
    )
  }

}
