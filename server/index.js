/**
 * @param {String} filePath
 * @returns {any}
 */
global.imp = (filePath) => {
  return require('./' + filePath)
}

require('dotenv').config()
const enviroment = require('./enviroment')
const { PORT } = enviroment
process.env = { ...enviroment, ...process.env }

require('./globals/ServerError')
require('./globals/UnathorizedError')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const fileUpload = require('express-fileupload')
const json2xls = require('json2xls')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const { load: modelInitializer } = require('./models')

global.serverPath = __dirname

class Server {
  constructor () {
    this.app = express()
    this.registerMiddleware()
    this.registerControllers()
    modelInitializer()
      .then(() => {
        this.app.listen(PORT, () => {
          console.log('Server running on port: ', PORT)
        })
      })
      .catch((error) => {
        throw error
      })
  }
  registerMiddleware () {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(json2xls.middleware)
    // this.app.use(multipart({ maxFieldsSize: 20971520 }))
    this.app.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 }
    }))
    this.app.use((req, res, next) => {
      res.sendError = (error) => {
        if (error && error.response && error.response.data) {
          console.error(error.response.data)
        } else {
          console.error(error)
        }

        if (error instanceof UnathorizedError) {
          res.status(error.statusCode).json({
            message: error.$message || error.message,
            code: error.$code || error.statusCode
          })
        } else if (error instanceof ServerError) {
          res.status(400).json({
            message: error.$message,
            code: error.$code
          })
        } else if (/Sequelize/i.test(error.name)) {
          res.status(500).json({
            message: (error.original && error.original.detail) || error.message,
            code: 2
          })
        } else {
          res.status(500).json({
            message: 'Unknown error',
            code: 1
          })
        }
      }
      next()
    })
  }
  registerControllers () {
    const controllers = fs
      .readdirSync(path.resolve(__dirname, './controllers'))
      .filter((controllerName) => !/^_/.test(controllerName))

    for (const controllerName of controllers) {
      const controllerPath = `./controllers/${controllerName}/${controllerName}Controller`
      const actionsPath = `./controllers/${controllerName}/actions`
      const config = require(controllerPath)
      const router = express.Router()
      const actions = {}
      const actionsFiles = fs.readdirSync(path.resolve(actionsPath))

      for (let fileName of actionsFiles) {
        fileName = fileName.replace(/\.js(.+)?/, '')
        actions[fileName] = require(actionsPath + '/' + fileName)
      }

      for (const routeConfig of (config.requestMapping || [])) {
        for (const method of routeConfig.methods) {
          router[method](routeConfig.path, async (req, res, next) => {
            try {
              const Action = actions[routeConfig.action]
              const controller = new Action(routeConfig, req, res, next)
              const params = controller.castParams()
              controller.validateParams(params)

              if (config.authRequired !== false) {
                await controller.validateUser()
              }

              /**
                 todo: auditar todas as operações neste ponto com o STATUS: INTENCAO,
                 devendo ter um identificador que será usado para os registros de CONLUIDO ou NEGADO a seguir
                 salvar: usuário logado, params, data do Registro, action da rota, verbo HTTP usado, ip que foi usado no consumo
                 */
              const result = await controller.handle(params)
              if (result !== void 0) {
                res.json(result)
              }
              // todo: salvar o status SUCESSO
            } catch (error) {
              // todo: salvar o status FALHA
              res.sendError(error)
            }
          })
        }
      }

      if (config.customFunction) {
        config.customFunction(router, this.app)
      }
      this.app.use(config.basePath, router)
    }
  }
}

if (enviroment.ENV === 'development') {
  global.server = new Server()
} else {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
    })
  } else {
    global.server = new Server()
  }
}
