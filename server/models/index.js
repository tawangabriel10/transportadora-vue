const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const lodash = require('lodash')
const enviroment = require('../enviroment')
const NODE_ENV = enviroment.ENV
const basename = path.basename(__filename)
const config = require('../config/config.json')[NODE_ENV]
const ASSOCIATION_TYPE = imp('enum/ASSOCIATION_TYPE')
const db = {}

const Op = Sequelize.Op
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}

if (config.operatorsAliases) {
  config.operatorsAliases = operatorsAliases
}

const sequelize = new Sequelize(enviroment.DATABASE_URL, config)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    model.__isModel = true
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  const Model = db[modelName]
  const associations = lodash.get(db[modelName], 'appDefinitions.associations')
  const mapTypesAssociations = {
    [ASSOCIATION_TYPE.MANY_TO_MANY]: (associationName, association, Target) => {
      Model.belongsTo(Target, {
        as: associationName,
        foreignKey: association.from
      })
    },
    [ASSOCIATION_TYPE.MANY_TO_ONE]: (associationName, association, Target) => {
      Model.belongsTo(Target, {
        as: associationName,
        foreignKey: association.from
      })
    },
    [ASSOCIATION_TYPE.ONE_TO_ONE]: (associationName, association, Target) => {
      Model.belongsTo(Target, {
        as: associationName,
        foreignKey: association.from
      })
    },
    [ASSOCIATION_TYPE.ONE_TO_MANY]: (associationName, association, Target) => {
      Model.hasMany(Target, {
        as: associationName,
        foreignKey: association.toColumn
      })
    }
  }
  for (const associationName in associations) {
    const association = associations[associationName]
    const TargetModel = db[association.to]
    mapTypesAssociations[association.type](associationName, association, TargetModel)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.load = async () => {
  const adm = await db.Perfil.findOne({ where: { nome: 'ADM' } })
  if (adm) {
    let modelsNames = Object.keys(db).filter((modelName) => db[modelName].__isModel)
    const modelsInsertedObj = {};
    (await db.PerfilAcessos.findAll({
      where: { idPerfil: adm.id, modelName: modelsNames },
      distinct: true,
      attributes: ['modelName']
    })).forEach(({ modelName }) => {
      modelsInsertedObj[modelName] = true
    })
    const modelNameToInsert = []
    for (const modelName of modelsNames) {
      if (!modelsInsertedObj[modelName]) {
        modelNameToInsert.push(modelName)
      }
    }
    if (modelNameToInsert.length) {
      await db.PerfilAcessos.bulkCreate(modelNameToInsert.map((modelName) => ({
        modelName,
        idPerfil: adm.id,
        accessRole: 'RW'
      })))
    }

    // executa rotinas de carga do banco de dados com os perfis de acessos iniciais
    const upsert = async (perfilNome, acessos) => {
      const { PerfilAcessos, Perfil } = db
      const perfil = await Perfil.findOne({ where: { nome: perfilNome } })
      if (perfil) {
        const modelsInsertedObj = {};
        (await PerfilAcessos.findAll({
          where: { idPerfil: perfil.id },
          distinct: true,
          attributes: ['modelName']
        })).forEach(({ modelName }) => {
          modelsInsertedObj[modelName] = true
        })

        return Promise.all(
          acessos.filter(({ modelName }) => !modelsInsertedObj[modelName]).map(({ modelName, accessRole }) => PerfilAcessos.create({
            modelName,
            accessRole,
            idPerfil: perfil.id
          }))
        )
      }
    }
    const pathSeederDir = path.resolve(serverPath, '_data', 'seeder-perfil-acessos')
    if (fs.existsSync(pathSeederDir)) {
      const filesSeedersAcessos = fs.readdirSync(pathSeederDir)
      const promises = []
      for (const filename of filesSeedersAcessos) {
        const { perfilNome, acessos } = require(path.resolve(pathSeederDir, filename))
        if (perfilNome && acessos) {
          promises.push(upsert(perfilNome, acessos))
        } else {
          console.warn(`Precisa inserir os atributos: "perfilNome" e "acessos" no arquivo: ${filename}`)
        }
      }
      await Promise.all(promises)
    }
  }
}

module.exports = db
