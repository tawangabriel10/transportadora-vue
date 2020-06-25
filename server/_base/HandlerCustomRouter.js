const lodash = require('lodash')
const typesValidator = require('./typesValidator')
const utils = require('./utils')
const Sequelize = require('sequelize')

module.exports = class HandlerCustomRouter {
  constructor (Model, models) {
    this.Model = Model
    this.models = models
  }
  getDefaultSequelizeParamsToGet (params) {
    const attributes = []
    const include = []

    const getIncludeSet = (Model, fieldName) => {
      const associations = lodash.get(Model, 'appDefinitions.associations', {})
      const association = associations[fieldName]
      if (association) {
        return association.customInclude ? association.customInclude(this.models) : {
          model: this.models[associations[fieldName].to],
          as: fieldName
        }
      }
    }

    const putIncludeRecursive = (Model, attributes, include, fields) => {
      let i = 0
      while (i < fields.length) {
        const fieldName = fields[i]
        if (typeof fieldName === 'string') {
          if (/^\$/.test(fieldName)) {
            const includeSet = getIncludeSet(Model, fieldName.replace(/^\$/, ''))

            if (includeSet) {
              include.push(includeSet)

              if (fields[i + 1] instanceof Array) {
                const attributes = []
                const include = []
                putIncludeRecursive(includeSet.model, attributes, include, fields[i + 1])

                if (attributes.length) {
                  if (!includeSet.attributes) {
                    includeSet.attributes = []
                  }
                  includeSet.attributes.push(...attributes)
                }

                if (include.length) {
                  if (!includeSet.include) {
                    includeSet.include = []
                  }
                  includeSet.include.push(...include)
                }
              }
            }
          } else {
            attributes.push(fieldName)
          }
        }
        i += 1
      }
    }

    // todo: outFields poderia ser um array de objeto contendo as configuraçoes possíveis do sequelize num "include"
    // Example: Usuario -> ['nome', 'setor', '$colaborador[$bairro[nome],$funcao,$posto[$uf[geocodigo]]]']
    for (const fieldName of params.outFields) {
      const normalizedFields = JSON.parse(`[${fieldName.replace(/\s+/g, '').replace(/([\w\d$]+)/g, `"$1"`).replace(/\[/g, ',[')}]`)
      putIncludeRecursive(this.Model, attributes, include, normalizedFields)
    }
    return {
      attributes,
      include
    }
  }
  async validateAuthentication (req, res, next) {
    if (req.$controllerBaseOptions.Model.appDefinitions.authRequired !== false) {
      await utils.validateUser(req)
    }
    next()
  }
  async exportRows (req, res, next) {
    const rows = (await this.getAll(req, res, next)).map(a => a.exportData ? a.exportData() : a.toJSON())
    const mapFormats = {
      'xls': () => {
        res.xls(req.$controllerBaseOptions.modelName + '.xlsx', rows)
      },
      'json': () => {
        res.json(rows)
      }
    }
    const format = req.params.format || 'xls'
    if (mapFormats[format]) {
      mapFormats[format]()
    } else {
      throw new ServerError('FORMAT_INVALID', [format])
    }
  }
  async getAll (req, res, next) {
    const getAllParams = {
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
        defaultValue: 1
      },
      size: {
        type: 'number',
        required: false,
        defaultValue: 20
      },
      order: { // [field, order(ASC, DESC)]
        type: 'string[]', // todo: verificar
        required: false,
        defaultValue: []
      },
      returnCountOnly: {
        type: 'boolean',
        required: false,
        defaultValue: false
      },
      distinctFields: {
        type: 'string[]',
        required: false,
        defaultValue: []
      },
      outStatistics: {
        type: 'object',
        required: false,
        defaultValue: []
      }
    }
    const params = typesValidator.cast(getAllParams, utils.getRequestValues(req))
    typesValidator.validate(getAllParams, params)

    const Model = this.Model
    let { attributes = [], include } = this.getDefaultSequelizeParamsToGet(params)

    if (params.include) {
      if (!include) {
        include = []
      }
      utils.replaceModelsFromInclude(params.include, req.$controllerBaseOptions.models)
      include.push(...params.include)
    }

    let pagination = {}

    if (params.size !== -1 && typeof params.size === 'number' && typeof params.page === 'number') {
      params.page -= 1
      pagination = {
        offset: params.page * params.size,
        limit: params.size
      }
    }

    for (const attribute of params.distinctFields) {
      attributes.unshift([
        Sequelize.fn('DISTINCT', Sequelize.col(attribute.replace(/([A-Z])/g, (a, b) => '_' + b.toLowerCase()))),
        attribute
      ])
    }

    for (const attribute of params.outStatistics) {
      attributes.push(
        [
          Sequelize.fn(attribute.statisticType, Sequelize.col(attribute.onStatisticField.replace(/([A-Z])/g, (a, b) => '_' + b.toLowerCase()))),
          attribute.outStatisticFieldName
        ]
      )
    }

    return Model[params.returnCountOnly ? 'count' : 'findAll']({
      ...pagination,
      ...(attributes.length ? { attributes } : {}),
      ...(include.length ? { include } : {}),
      ...(params.where ? { where: params.where } : {}),
      ...(params.order ? { order: params.order } : {})
    })
  }
  async streamOne (req, res) {
    const { id } = req.params
    if (!this.Model.getFile) {
      throw new Error('Método estático getFile precisa ser implementado na Model')
    }
    const row = await this.Model.getFile(id, this.models)
    res.setHeader('content-type', row.contentType.replace(/[^\w\d/-]+/ig, ''))
    res.setHeader('Content-Disposition', `attachment; filename="${row.filename.replace(/[^\w\d-.]+/ig, '')}"`)
    res.send(row.data)
    res.end()
  }
  async getOne (req, res, next) {
    const getAllParams = {
      outFields: {
        type: 'string[]',
        required: false,
        defaultValue: []
      },
      include: {
        type: 'object',
        required: false,
        defaultValue: null
      }
    }
    const params = typesValidator.cast(getAllParams, utils.getRequestValues(req))
    typesValidator.validate(getAllParams, params)
    let { attributes, include } = this.getDefaultSequelizeParamsToGet(params)

    if (params.include) {
      if (!include) {
        include = []
      }
      utils.replaceModelsFromInclude(params.include, req.$controllerBaseOptions.models)
      include.push(...params.include)
    }

    return this.Model.findOne({
      where: {
        id: req.params.id
      },
      ...(attributes.length ? { attributes } : {}),
      ...(include.length ? { include } : {})
    })
  }
  async insertOne (req, res, next) {
    const values = utils.getRequestValues(req)
    try {
      const attachments = {}

      if (req.files) {
        for (const fieldName in req.files) {
          const attach = req.files[fieldName]
          attachments[fieldName] = attach.data
          attachments[fieldName + 'ContentType'] = attach.mimetype
          attachments[fieldName + 'Nome'] = attach.name
        }
      }

      const resut = await this.Model.create({
        ...values,
        ...attachments
      })
      return resut
    } catch (error) {
      throw error
    }
  }
  async deleteOne (req, res, next, modelName) {
    const doc = await this.getOne(req, res, next)
    if (!doc) {
      throw new ServerError('NOT_EXISTS', [req.params.id, modelName])
    }
    await doc.destroy()
    return doc
  }
  async deleteAll (req, res, next, modelName) {
    const getAllParams = {
      where: {
        type: 'object',
        required: true
      }
    }
    const params = typesValidator.cast(getAllParams, utils.getRequestValues(req))
    typesValidator.validate(getAllParams, params)

    if (!Object.keys(params.where).length) {
      throw new ServerError('REMOVE_ALL_BLOCK')
    }

    return this.models[modelName].destroy({ where: params.where })
  }
  async updateOne (req, res, next, modelName) {
    const doc = await this.getOne(req, res, next)
    if (!doc) {
      throw new ServerError('NOT_EXISTS', [req.params.id, modelName])
    }
    await doc.update(req.body)
    return doc
  }
}
