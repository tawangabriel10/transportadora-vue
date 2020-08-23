'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
                `

                    create table gestao.tb_proposta
                        (
                            id serial not null primary key,
                            hora_criacao timestamp default now(),
                            num_proposta varchar not null,
                            situacao varchar,
                            validade date,
                            descricao_servico varchar,
                            id_cliente integer references gestao.tb_cliente_ou_fornecedor(id),
                            id_cliente_calculo integer references gestao.tb_cliente_ou_fornecedor(id),
                            origem varchar,
                            destino varchar,
                            unidade_medida varchar,
                            valor_unidade_medida integer,
                            km integer,
                            indice integer,
                            valor_seguro float,
                            porcentagem_seguro integer,
                            coeficiente integer,
                            total float
                        );


                    alter table gestao.tb_empresas
                            add column seguradora varchar,
                            add column numero_apolice varchar;


                    update gestao.tb_empresas set seguradora = 'Tokio Marine Seguradora S.A.',
                            numero_apolice = '5500000004454'
                            where nome = 'CINCO ESTRELAS TRANSPORTES E LOGÍSTICA LTDA' and cnpj = '03.557.321/0001-99';

                    update gestao.tb_empresas set seguradora = 'Tokio Marine Seguradora S.A.',
                            numero_apolice = '5500000004459'
                            where nome = '5 ESTRELAS CMO.E SERV. DE MUDANÇAS LTDA' and cnpj = '11.292.432/0001-30';

                    update gestao.tb_empresas set seguradora = 'Tokio Marine Seguradora S.A.',
                            numero_apolice = '5500000004457'
                            where nome = 'AMERICA GLOBAL COM. E TRANSPORTES LTDA' and cnpj = '32.915.001/00001-52';


                    create table gestao.tb_ocorrencias
                        (
                            id serial not null primary key,
                            data_hora_criacao timestamp default now(),
                            tipo varchar not null,
                            descricao varchar not null,
                            id_arquivo integer references gestao.tb_arquivo(id),
                            id_usuario integer references gestao.tb_usuarios(id),
                            id_ordem_servico integer references gestao.tb_ordem_servico(id)
                        );

                `
        )
    }
            
}