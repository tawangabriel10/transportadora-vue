### INSTALAÇÃO

BANCO DE DADOS:

- Postgres versão 12

```shell script
sudo -u postgres psql
postgres=# create database cinco_estrelas;
postgres=# create user user_cinco_estrelas with encrypted password ‘i9ty-cinco-estrelas’;
postgres=# grant all privileges on database cinco_estrelas to user_cinco_estrelas;
postgres=# \c cinco_estrelas;
postgres=# CREATE SCHEMA adm;
postgres=# ALTER DATABASE cinco_estrelas OWNER TO user_cinco_estrelas;
postgres=# ALTER SCHEMA adm OWNER TO user_cinco_estrelas;
````

- Executar migrations do Sequelize
```shell script
cd ./server
sudo yarn global add sequelize-cli
npx sequelize-cli db:migrate
```

#### Padrão de consumo dos endpoints

- Inserir um registro
```HTTP Request
POST /i9ty-v1/${NOME_DO_ARQUIVO_JS_DA_MODEL}
Content-Type: application/json;

{
    ${BODY}
}
```

- Pegar registros
```HTTP Request
GET /i9ty-v1/${NOME_DO_ARQUIVO_JS_DA_MODEL}
Content-Type: application/json;

{
      where: {
        type: 'object',
        required: false,
        defaultValue: {}
      },
      include: {
        type: 'object',
        required: false,
        defaultValue: null
      },
      outFields: {
        type: 'string[]',
        required: false,
        defaultValue: []
      },
      page: {
        type: 'number',
        required: false,
        defaultValue: 0
      },
      size: {
        type: 'number',
        required: false,
        defaultValue: 20
      },
      /** Exemplo: [field, order(ASC, DESC)] */
      order: {
        type: 'string[]',
        required: false,
        defaultValue: []
      },
      returnCountOnly: {
        type: 'boolean',
        required: false,
        defaultValue: false
      }
    }
```
