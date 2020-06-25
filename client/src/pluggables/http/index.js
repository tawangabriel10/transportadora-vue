import axios from 'axios'
import config from '@/config'
import store from '@/store/login'
import { clearBrowserData } from '@/store/login/actions'
import lodash from 'lodash'

axios.defaults.timeout = 60 * 8 * 1000

export const http = axios.create({
  baseURL: config.baseUrl
})

Object.defineProperty(http, 'CancelToken', {
  get () {
    return axios.CancelToken
  }
})

http.isCancel = function (token) {
  return axios.isCancel(token)
}

http.interceptors.response.use(null, async (error) => {
  const statusJstCode = lodash.get(error, 'response.data.code')
  if (statusJstCode === 401) {
    clearBrowserData()
    window.location = '/'
  }
})

http.interceptors.request.use(config => {
  if (config.baseURL.match(config.baseUrl)) {
    config.headers['authentication-token'] = store.state.token
  }
  return config
}, err => Promise.reject(err))

http.normalizeUrl = (path) => {
  return `${config.baseUrl.replace(/\/\/?$/, '')}/${path.replace(/^\/\/?/, '')}`
}

http.getUrl = (path) => {
  const url = http.normalizeUrl(path)
  const separator = url.match(/\?./) ? '&' : '?'
  return `${url}${separator}authentication-token=${store.state.token}`
}

export default {
  install (Vue) {
    Vue.mixin({
      beforeCreate: function () {
        this.$http = http
      }
    })
  }
}
