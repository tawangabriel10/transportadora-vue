
'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
                `

                    alter table gestao.tb_ordem_servico
                        add column produto_transportado varchar;

                    alert table gestao.tb_cliente_ou_fornecedor
                        add column status varchar,
                        add column endereco_gerado_estado varchar,
                        add column endereco_gerado_pais varchar,
                        add column contato_comercial varchar,
                        add column contato_financeiro varchar,
                        add column contato_telefone_comercial varchar,
                        add column contato_telefone_financeiro varchar,
                        add column contato_email_comercial,
                        add column contato_email_financeiro;

                `
        )
    }
}