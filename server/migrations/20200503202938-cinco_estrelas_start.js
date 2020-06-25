'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
                create table gestao.tb_empresas
                (
                    id                 serial primary key,
                    hora_criacao       timestamp default now(),
                    nome       varchar not null,
                    cnpj               varchar,
                    inscricao_estadual varchar,
                    endereco           varchar,
                    cep                varchar
                );
                create table gestao.ta_empresas_entidades
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    id_empresa   integer not null references gestao.tb_empresas(id) ON DELETE CASCADE,
                    model_name   varchar not null,
                    id_entity    integer not null
                );                    

                create table gestao.tb_tipos_modalidade_cliente_fornecedor
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar,
                    tipo_cliente varchar check ( tipo_cliente IN ('PF', 'PJ') ) -- identifica se é uma modalidade de PF ou de PJ
                );

                create table gestao.tb_cfop
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    codigo_cfop float,
                    natureza_operacao varchar,
                    nome varchar,
                    ativo integer check ( ativo IN (0, 1) ),
                    codigo_contabil varchar
                );

                create table gestao.ta_cfop_finalidade
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar check ( nome IN ('NF-e', 'CONHECIMENTO', 'NOTA_ENTRADA_TERCEIRO', 'NOTA_SERVICO') ),
                    id_cfop integer references gestao.tb_cfop(id)
                );

                create table gestao.tb_cliente_ou_fornecedor
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    tipo_cliente varchar check ( tipo_cliente IN ('PF', 'PJ') ),

                    nome varchar, -- PF
                    cpf varchar, -- PF
                    apelido varchar, -- PF
                    rg varchar, -- PF
                    rg_uf varchar, -- PF
                    data_emissao date, -- PF
                    orgao_expeditor varchar, -- PF
                    data_nascimento date, -- PF
                    naturalidade varchar, -- PF
                    sexo varchar check ( sexo IN ('M', 'F') ), -- PF

                    cep varchar,
                    endereco_gerado_pelo_cep varchar, -- será gerado pelo sistema
                    endereco_codigo_ibge varchar, -- para estado e cidade
                    endereco_gerado_uf varchar, -- será gerado pelo sistema
                    endereco_gerado_cidade varchar, -- será gerado pelo sistema
                    endereco_bairro varchar,
                    endereco_numero float,
                    endereco_complemento varchar,
                    endereco_referencia varchar,

                    email varchar,
                    email_secundario varchar,
                    telefone varchar,
                    telefone_celular varchar,
                    nome_contato varchar,


                    cnpj varchar, -- PJ
                    razao_social varchar, -- PJ
                    nome_fantasia varchar, -- PJ
                    inscricao_estadual varchar, -- PJ
                    inscricao_municipal varchar, -- PJ
                    inscricao_suframa varchar, -- PJ
                    contribuicao_icms varchar, -- PJ,
                    id_cfop integer references gestao.tb_cfop(id)
                );

                create table gestao.ta_cliente_modalidade
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    id_tipo_modalidade integer references gestao.tb_tipos_modalidade_cliente_fornecedor(id),
                    id_cliente integer references gestao.tb_cliente_ou_fornecedor(id)
                );

                create table gestao.tb_mapa_viagem
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    status varchar check ( status IN ('EM_TRANSITO', 'ENTREGUE', 'IMPEDIDO_AVARIAS') )
                );

                
                create table gestao.tb_motorista
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar,
                    cpf varchar,
                    rg varchar,
                    rg_uf varchar,
                    data_emissao date,
                    orgao_expeditor varchar,
                    data_nascimento date,
                    naturalidade varchar,
                    nome_mae varchar,
                    nome_pai varchar,
                    nome_contato varchar,

                    cnh varchar,
                    categoria_cnh varchar check ( categoria_cnh IN ('A', 'B', 'C', 'D', 'E', 'AB', 'AC', 'AD', 'AE') ),
                    cnh_data_validade DATE,
                    cnh_data_1_emissao DATE,
                    cnh_data_emissao DATE,
                    cnh_n_renach varchar,
                    cnh_orgao_emissor varchar,
                    cnh_uf varchar,

                    cep varchar,
                    endereco_gerado_pelo_cep varchar, -- será gerado pelo sistema
                    endereco_codigo_ibge varchar, -- para estado e cidade
                    endereco_gerado_uf varchar, -- será gerado pelo sistema
                    endereco_gerado_cidade varchar, -- será gerado pelo sistema
                    endereco_bairro varchar,
                    endereco_numero float,
                    endereco_complemento varchar,
                    endereco_referencia varchar,
                    
                    telefone varchar,
                    telefone_celular varchar,
                    sexo varchar check ( sexo IN ('M', 'F') ),
                    estado_civil varchar check ( estado_civil IN ('SOLTEIRO', 'CASADO') ),

                    data_contratacao DATE,
                    data_desligamento DATE,
                    situacao varchar,

                    numero_inss varchar,
                    n_dependentes float,
                    nome_contato_1 varchar,
                    telefone_contato1 varchar,
                    nome_contato_2 varchar,
                    telefone_contato2 varchar,
                    
                    dados_seguro_pessoa varchar,
                    observacoes text
                );

                create table gestao.td_tipo_veiculo
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar not null
                );

                create table gestao.td_controle_natureza_carga
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar not null
                );

                create table gestao.tb_veiculos
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar,
                    placa varchar,
                    ano float,
                    cor varchar,
                    marca_modelo varchar,
                    renavam varchar,
                    n_chassi varchar,
                    med_carroceria varchar,
                    tara varchar,
                    capacicidade_kg float,
                    capacidade_m_cubicos float,
                    capacidade_tanque float,
                    n_eixos float,
                    media_km_litro float,

                    endereco_codigo_ibge varchar, -- para estado e cidade
                    endereco_cidade varchar, -- gerado pelo sistema
                    endereco_uf varchar, -- gerado pelo sistema
                    
                    observacoes text,

                    id_tipo_veiculo integer references gestao.td_tipo_veiculo(id),
                    id_motorista integer references gestao.tb_motorista(id)
                );

                create table gestao.tb_veiculos_vinculados
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar,
                    placa varchar,
                    renavam varchar,
                    chassi varchar,
                    id_veiculo_principal integer references gestao.tb_veiculos(id),
                    id_tipo_veiculo integer references gestao.td_tipo_veiculo(id),
                    n_eixos float,
                    tara varchar,
                    capacidade_kg float,
                    capacidade_m_cubicos float,

                    endereco_codigo_ibge varchar, -- para estado e cidade
                    endereco_cidade varchar, -- gerado pelo sistema
                    endereco_uf varchar, -- gerado pelo sistema
                    
                    marca_modelo varchar,
                    ano float,
                    cor varchar,
                    codigo_fipe varchar,
                    observacoes text
                );

                create table gestao.tb_natureza_carga
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    id_controle_natureza_carga integer references gestao.td_controle_natureza_carga(id),
                    nome varchar,
                    especie varchar,
                    codigo_externo varchar,
                    codigo_harmonizado varchar,
                    valor_diario_armazenagem float
                );

                create table gestao.tb_natureza_carga_atributo
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    nome varchar,
                    valor float,
                    id_natureza_carga integer references gestao.tb_natureza_carga(id)
                );

                create table gestao.tb_ordem_servico
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    id_mapa_viagem integer references gestao.tb_mapa_viagem(id),
                    local_emissao_cod_ibge float,
                    local_emissao_desc varchar,
                    data_coleta DATE,
                    hora_limite varchar,
                    local_coleta varchar,
                    local_entrega varchar,
                    hora_chamada varchar,
                    nome_solicitante varchar,
                    
                    id_remetente integer references gestao.tb_cliente_ou_fornecedor(id),
                    nome_remetente_contato_responsavel varchar,
                    
                    id_destinatario integer references gestao.tb_cliente_ou_fornecedor(id),
                    nome_destinatario_contato_responsavel varchar,

                    id_veiculo_principal integer references gestao.tb_veiculos(id),
                    km_saida float,
                    horario_saida varchar, -- usar string no formato HH:mm
                    
                    id_motorista integer references gestao.tb_motorista(id),
                    chapa varchar,

                    id_consignatario integer references gestao.tb_cliente_ou_fornecedor(id),
                    nome_consignatario_responsavel varchar,

                    id_redespacho integer references gestao.tb_cliente_ou_fornecedor(id),
                    nome_redespacho_responsavel varchar,
                    
                    -- aba 3
                    valor_frete float,
                    pedagio float,
                    ad_valoragem float,
                    seguro float,
                    outros float,
                    taxa_coleta float,
                    taxa_entrega float,
                    redespacho float
                );

                create table gestao.tb_mercadorias
                (
                    id           serial primary key,
                    hora_criacao timestamp default now(),
                    quantidade float,
                    unidade varchar,
                    peso_bruto_kg float,
                    peso_liquido_kg float,
                    cubagem float,
                    n_nota_fiscal varchar,
                    data_emissao DATE,
                    valor_nota_fiscal float,
                    id_natureza_carga integer references gestao.tb_natureza_carga(id),
                    especie_volume_categoria varchar,
                    tara varchar,
                    lacre varchar,
                    observacoes text,

                    id_ordem_servico integer not null references gestao.tb_ordem_servico(id)
                );
      `
    )
  }

}
