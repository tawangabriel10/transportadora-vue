'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
                `

                    create table gestao.tb_auditoria
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            nome_cadastro varchar,
                            data_cadastro date,
                            nome_alterado varchar,
                            data_alterado date,
                            cod_autenticacao_email varchar
                        );

                `
        )
    }
            
}