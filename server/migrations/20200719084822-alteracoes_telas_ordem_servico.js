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


                    alter table gestao.tb_ordem_servico
                        add column id_auditoria integer references gestao.tb_auditoria(id),
                        add column numero_ordem_servico integer,
                        add column data_emissao date,
                        add column hora_emissao varchar,
                        add column status varchar,
                        add column tipo_solicitante varchar,
                        add column cpf_cnpj_solicitante varchar;


                    alter table gestao.tb_cliente_ou_fornecedor
                        add column nome_responsavel varchar,
                        add column contato_responsavel varchar;


                    alter table gestao.tb_motorista
                        add column chapa varchar;


                    alter table gestao.tb_veiculos
                        add column km_saida integer,
                        add column horario_saida varchar,
                        add column local varchar,
                        add column descricao varchar;


                    alter table gestao.tb_dados_opcionais
                        drop column valor_frete,
                        drop column pedagio,
                        drop column ad_valoragem,
                        drop column seguro,
                        drop column outros,
                        drop column taxa_aerea,
                        drop column taxa_coleta,
                        drop column taxa_entrega,
                        drop column valor_redespacho,
                        drop column taxa_prestacao;


                    create table gestao.tb_frete
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            valor_frete float,
                            pedagio float,
                            ad_valoragem float,
                            seguro float,
                            outros float,
                            taxa_aerea float,
                            taxa_coleta float,
                            taxa_entrega float,
                            valor_redespacho float,
                            total_prestacao float
                        );


                    alter table gestao.tb_dados_opcionais
                        add column id_frete integer references gestao.tb_frete(id);

                `
        )
    }
            
}