
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
        `

                alter table gestao.tb_ordem_servico
                        drop column id_consignatario,
                        drop column nome_consignatario_responsavel,

                        drop column id_redespacho,
                        drop column nome_redespacho_responsavel,
                        
                        drop column valor_frete,
                        drop column pedagio,
                        drop column ad_valoragem,
                        drop column seguro,
                        drop column outros,
                        drop column taxa_coleta,
                        drop column taxa_entrega,
                        drop column valor_redespacho;


                create table gestao.tb_dados_opcionais
                (
                        id                 serial primary key,
                        id_consignatario integer references gestao.tb_cliente_ou_fornecedor(id),
                        nome_consignatario_responsavel varchar,

                        id_redespacho integer references gestao.tb_cliente_ou_fornecedor(id),
                        nome_redespacho_responsavel varchar,

                        valor_frete float,
                        pedagio float,
                        ad_valoragem float,
                        seguro float,
                        outros float,
                        taxa_aerea float,
                        taxa_coleta float,
                        taxa_prestacao float,
                        taxa_entrega float,
                        valor_redespacho float,
                        data_chegada DATE,
                        hora_chegada varchar,
                        forma_pagamento varchar,
                        resposta_pagamento varchar,
                        numero_referencia varchar,
                        valor_referencia float,
                        conhecimento varchar,
                        nota_fiscal varchar,
                        finalidade_transporte varchar,
                        material varchar,
                        numero_risco varchar,
                        numero_onu varchar,
                        seguradora varchar,
                        numero_apolice varchar,
                        numero_container varchar,
                        tipo_container varchar,
                        navio varchar,
                        armador varchar,
                        booking varchar,
                        doc_aduaneiro varchar,
                        di_dta varchar,
                        agencia varchar,
                        porto varchar
                );

                alter table gestao.tb_ordem_servico
                        add column id_dados_opcionais integer references gestao.tb_dados_opcionais(id);
                        
            `
        )
    }
                  
}