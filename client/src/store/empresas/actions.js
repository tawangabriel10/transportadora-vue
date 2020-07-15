import { http } from '@/pluggables/http'
import config from '@/config'

const empresasUrl = config.baseUrl + '/empresas'

export default {
    async setCurrentEmpresa ({ commit }, idEmpresa) {
        const { data: currentEmpresa } = await http.get(`${empresasUrl}/${idEmpresa}`)
        commit('setCurrentEmpresa', currentEmpresa)
      },
      async find ({ commit, state }, { params = {}, updateState = true } = {}) {
        commit('set_loading', true)
        try {
          params = Object.assign({}, params)
          for (const key in params) {
            if (typeof params[key] === 'object') {
              params[key] = JSON.stringify(params[key])
            }
          }
          const res = await http.get(empresasUrl, { params })
          if (!res) {
            throw new Error(`> Não conseguiu consumir: "${url}"`)
          }
          if (updateState && res.data) {
            commit('set_data', { data: res.data })
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
}