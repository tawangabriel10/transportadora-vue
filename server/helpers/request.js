const axios = require('axios')
const queryString = require('querystring')

class Request {
  async get (url, params, headers, options) {
    return this._do('GET', url, params, headers, options)
  }

  async post (url, params, headers, options) {
    return this._do('POST', url, params, headers, options)
  }

  async _do (verb, url, params = {}, headers = {}, options = {}) {
    const normalizeParams = (data) => {
      const nObj = {}
      Object.keys(data)
        .map((key) => {
          let value = data[key]
          const mappingTypes = {
            'string': (value) => value,
            'number': (value) => value,
            'object': (value) => value !== null ? value : void 0,
            'boolean': (value) => value
          }
          const typeofValue = typeof value
          return { key, value: mappingTypes[typeofValue] ? mappingTypes[typeofValue](value) : void 0 }
        })
        .filter(({ value, key }) => value !== void 0 && !(/^_/.test(key)))
        .forEach(({ key, value }) => {
          nObj[key] = value
        })
      return queryString.stringify(nObj)
    }

    const mappingVerbs = {
      GET: async () => {
        return axios.get(url + '?' + queryString.stringify(params), {
          headers
        })
      },
      POST: async () => {
        const urlSearchParams = new URLSearchParams()
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            if (typeof params[key] === 'object') {
              urlSearchParams.append(key, queryString.stringify(params[key]))
            } else if (typeof params[key] === 'boolean') {
              urlSearchParams.append(key, params[key].toString())
            } else {
              urlSearchParams.append(key, params[key])
            }
          }
        }
        return axios.post(url, urlSearchParams, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers
          }
        })
      }
    }
    if (options.stream) {
      const parameteresRequest = {}

      if (verb === 'GET') {
        parameteresRequest['params'] = params
        parameteresRequest['paramsSerializer'] = normalizeParams
      } else {
        parameteresRequest['data'] = params
        parameteresRequest['transformRequest'] = normalizeParams
      }
      const response = await axios({
        responseType: 'stream',
        method: verb,
        url,
        headers,
        ...parameteresRequest
      })
      return response.data
    }
    return mappingVerbs[verb]()
  }
}

module.exports = new Request()
