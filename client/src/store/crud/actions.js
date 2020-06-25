import { http } from '@/pluggables/http'
import config from '@/config'

const baseUrl = config.baseUrl

const convertToFormData = (values = {}) => {
  // eslint-disable-next-line no-undef
  const formData = new FormData()
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      formData.append(key, values[key])
    }
  }
  return formData
}

export default {
  async setCurrentEmpresa ({ commit }, idEmpresa) {
    const { data: currentEmpresa } = await http.get(http.getUrl(`/empresas/${idEmpresa}`))
    commit('setCurrentEmpresa', currentEmpresa)
  },
  async find ({ commit, state }, { entity, params = {}, updateState = true } = {}) {
    commit('set_loading', true)
    try {
      params = Object.assign({}, params)
      for (const key in params) {
        if (typeof params[key] === 'object') {
          params[key] = JSON.stringify(params[key])
        }
      }
      const url = `${baseUrl}/${entity}`
      const res = await http.get(url, { params })
      if (!res) {
        throw new Error(`> Não conseguiu consumir: "${url}"`)
      }
      if (updateState && res.data) {
        commit('set_data', { entity, data: res.data })
      }
      return res.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw error
      }
    } finally {
      commit('set_loading', false)
    }
  },
  async insertRow ({ commit, state, dispatch }, { entity, values = {}, isFormData = false, updateState = true } = {}) {
    commit('set_loading', true)
    try {
      if (isFormData) {
        values = convertToFormData(values)
      }
      const url = `${baseUrl}/${entity}`
      const res = await http.post(url, values)
      if (!res) {
        throw new Error(`> Não conseguiu consumir: "${url}"`)
      }
      if (res.data.id && updateState) {
        if (!state.data[entity]) {
          state.data[entity] = []
        }
        state.data[entity].push(res.data)
        const where = state.filter[entity] || {} // garante que mesmo após inserção os dados exibidos respeitarão o filtro configurado
        dispatch('find', { entity, params: { where } })
      }
      return res.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw error
      }
    } finally {
      commit('set_loading', false)
    }
  },
  async removeRow ({ commit, state }, { entity, key, updateState = true }) {
    commit('set_loading', true)
    try {
      const url = `${baseUrl}/${entity}/${key}`
      const res = await http.delete(url)
      if (!res) {
        throw new Error(`> Não conseguiu consumir: "${url}"`)
      }
      if (!state.data[entity]) {
        state.data[entity] = []
      }
      const current = state.data[entity].filter(v => {
        if (v.id !== key) {
          return v
        }
      })
      if (updateState) {
        commit('set_data', { entity, data: current })
      }
      return res
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw error
      }
    } finally {
      commit('set_loading', false)
    }
  },
  async updateRow ({ commit, state }, { entity, values, key, isFormData = false, updateState = true } = {}) {
    commit('set_loading', true)
    try {
      values = { ...values }
      delete values.id
      if (isFormData) {
        values = convertToFormData(values)
      }
      const url = `${baseUrl}/${entity}/${key}`
      const res = await http.put(url, values)
      if (!res) {
        throw new Error(`> Não conseguiu consumir: "${url}"`)
      }
      if (updateState) {
        if (!state.data[entity]) {
          state.data[entity] = []
        }
        const current = state.data[entity].filter(v => {
          if (v.id !== key) {
            return v
          }
        })
        current.push(res.data)
        commit('set_data', { entity: entity, data: current })
      }
      return res.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else {
        throw error
      }
    } finally {
      commit('set_loading', false)
    }
  },
  setLoadingStatus ({ commit }, isLoading) {
    commit('set_loading', isLoading)
  }
}
