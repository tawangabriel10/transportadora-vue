'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
                `

                    create table gestao.tb_proposta
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            nome varchar not null
                        );



                `
        )
    }
            
}