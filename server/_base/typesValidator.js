
const validateArrayType = (value, cb) => {
  return value instanceof Array && value.filter(cb).length === value.length
}
const validateCustomObject = (config, value) => {
  return typeof value === 'object' && validateArrayType(Object.keys(value), (fieldName) => {
    if (typeof config[fieldName] === 'function') {
      return config[fieldName](value[fieldName])
    }
    return !!config[fieldName] && typesValidator[config[fieldName]](value[fieldName])
  })
}

const castToObject = (value) => {
  return typeof value === 'string' ? JSON.parse(value) : value
}
const castToArray = (value) => {
  return Array.from(castToObject(value))
}

const typesCast = {
  'boolean' (value) {
    if (value === 'false') {
      return false
    }
    return Boolean(value)
  },
  'object' (value) {
    return typeof value === 'string' ? JSON.parse(value) : value
  },
  'string' (value, key) {
    if (typeof value === 'object') {
      throw new ServerError('PARAM_INVALID', [key, value])
    }
    return String(value)
  },
  'string[]' (value) {
    return castToArray(value).map((v) => String(v))
  },
  'number' (value) {
    return +value
  },
  'number[]' (value) {
    return castToArray(value).map((v) => +v)
  },
  'array' (value) {
    return castToArray(value)
  },
  'filter' (value) {
    return castToObject(value)
  },
  'filter[]' (value) {
    return castToArray(value)
  },
  'filter[][]' (value) {
    return castToArray(castToArray(value))
  },
  'geojson' (value) {
    return castToObject(value)
  }
}

const typesValidator = {
  'string' (value) {
    return typeof value === 'string'
  },
  'boolean' (value) {
    return typeof value === 'boolean'
  },
  'string[]' (value) {
    return validateArrayType(value, (iter) => typeof iter === 'string')
  },
  'number' (value) {
    return typeof value === 'number'
  },
  'number[]' (value) {
    return validateArrayType(value, (iter) => typeof iter === 'number')
  },
  'object' (value) {
    return typeof value === 'object' || (typeof value === 'string' && /^{|\[/.test(value))
  },
  'array' (value) {
    return value instanceof Array
  },
  'filter' (value) {
    return validateCustomObject({
      operator: 'string',
      values: 'array',
      fieldName: 'string',
      projection: 'number'
    }, value)
  },
  'filter[]' (value) {
    return validateArrayType(value, (iter) => this.filter(iter))
  },
  'filter[][]' (value) {
    return validateArrayType(value, (v) => validateArrayType(v, (iter) => this.filter(iter)))
  },
  'geojson' (value) {
    return validateCustomObject({
      type: 'string',
      coordinates: (coordinates) => {
        return coordinates instanceof Array && coordinates.length && coordinates[0] instanceof Array
      }
    }, value)
  }
}

exports.validate = (config = {}, values = {}) => {
  for (const key in config) {
    if (config[key].type && values[key] !== void 0 && values[key] !== null) {
      const valid = typesValidator[config[key].type](values[key], key, config[key])
      if (!valid && values[key]) {
        throw new ServerError('PARAM_INVALID', [key, config[key].type])
      }

      if (config[key].enum && config[key].enum.length && !~config[key].enum.indexOf(values[key])) {
        throw new ServerError('ENUM_INVALID', [key, config[key].enum.join(', ')])
      }
    }
  }
}
exports.cast = (config = {}, values = {}) => {
  const params = {}
  for (const key in config) {
    if (config[key].required && (values[key] === null || values[key] === void 0)) {
      throw new ServerError('PARAM_MANDATORY', [key])
    }
    if (values[key] && config[key].type && typesCast[config[key].type]) {
      params[key] = typesCast[config[key].type](values[key], key, config[key])
    } else {
      params[key] = values[key] === void 0 ? (config[key].defaultValue !== void 0 ? config[key].defaultValue : null) : values[key]
    }
  }
  return params
}
