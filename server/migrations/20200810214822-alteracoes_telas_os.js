'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
                `

                    create table gestao.tb_solicitante
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            nome varchar not null
                        );


                    alter table gestao.tb_ordem_servico
                        drop column id_auditoria,
                        drop column id_motorista,
                        drop column id_veiculo_principal,
                        drop column id_mapa_viagem,
                        add column id_solicitante integer references gestao.tb_solicitante(id);


                    alter table gestao.tb_mercadorias
                        drop column quantidade,
                        drop column id_natureza_carga;

                
                    alter table gestao.tb_dados_opcionais
                        drop column id_consignatario,
                        drop column nome_consignatario_responsavel,
                        drop column id_redespacho,
                        drop column nome_redespacho_responsavel,
                        drop column id_frete,
                        drop column data_chegada,
                        drop column hora_chegada,
                        drop column forma_pagamento,
                        drop column resposta_pagamento,
                        drop column numero_referencia,
                        drop column valor_referencia,
                        drop column conhecimento,
                        drop column nota_fiscal,
                        drop column finalidade_transporte,
                        drop column material,
                        drop column numero_risco,
                        drop column numero_onu;


                `
        )
    }
            
}