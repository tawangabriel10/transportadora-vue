
'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
                `

                    alter table gestao.tb_ordem_servico
                        add column produto_transportado varchar;


                    alter table gestao.tb_dados_opcionais
                        add column hora_criacao timestamp default now();


                    create table gestao.tb_arquivo
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            descricao varchar,
                            arquivo_base text,
                            tipo varchar,
                            tamanho integer
                        );


                    create table gestao.tb_pagamento_dados_bancarios
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            razao_social varchar not null,
                            cnpj varchar not null,
                            formas_de_pagamento varchar,
                            agencia varchar,
                            conta_corrente varchar,
                            banco varchar,
                            numero_banco integer,
                            cidade_agencia varchar,
                            uf_conta varchar,
                            modalidade varchar,
                            tipo_contribuinte varchar
                        );

                    create table gestao.tb_servicos_produtos
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            servico_produto_prestado varchar,
                            horario_atendimento varchar,
                            id_arquivo_cartao_cnpj integer references gestao.tb_arquivo(id),
                            id_arquivo_copia_alvara_funcionamento integer references gestao.tb_arquivo(id),
                            id_arquivo_comprovante_insc_est_mun integer references gestao.tb_arquivo(id),
                            id_arquivo_fotos_empresa integer references gestao.tb_arquivo(id)
                        );
                    

                    alter table gestao.tb_cliente_ou_fornecedor
                            add column status varchar,
                            add column endereco_gerado_estado varchar,
                            add column endereco_gerado_pais varchar,
                            add column contato_comercial varchar,
                            add column contato_financeiro varchar,
                            add column contato_telefone_comercial varchar,
                            add column contato_telefone_financeiro varchar,
                            add column contato_email_comercial varchar,
                            add column contato_email_financeiro varchar,
                            add column id_pagamento_dados_bancarios integer references gestao.tb_pagamento_dados_bancarios(id),
                            add column id_servicos_produtos integer references gestao.tb_servicos_produtos(id);
                `
        )
    }
}