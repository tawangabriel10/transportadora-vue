
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
                  create table gestao.tb_perfil
                  (
                      id serial not null primary key,
                      hora_criacao timestamp default now(),
                      nome varchar(150) not null
                  );
                  create table gestao.tb_perfil_acessos
                  (
                      id serial not null primary key,
                      hora_criacao timestamp default now(),
                      id_perfil integer not null constraint id_perfil_tb_perfil_acessos_fk references gestao.tb_perfil(id),
                      model_name varchar(200) not null,
                      access_role varchar(10) not null check ( access_role IN ('R', 'RW') )
                  );
                  create table gestao.tb_usuarios
                  (
                      id serial not null
                          constraint usuarios_pk
                              primary key,
                      hora_criacao timestamp default now(),
                      senha          text,
                      nome_usuario   varchar(150),
                      id_perfil      integer     not null
                          constraint id_perfil_tb_usuarios_fk
                              references gestao.tb_perfil,
                      situacao       varchar(20) not null
                          constraint tb_usuarios_situacao_check
                              check (((situacao)::text = 'ATIVO'::text) OR ((situacao)::text = 'INATIVO'::text))
                  );
          `
    )
  }

}
