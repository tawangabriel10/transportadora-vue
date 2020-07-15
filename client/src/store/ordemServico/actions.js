import { http } from '@/pluggables/http'
import config from '@/config'

const ordemServicoUrl = config.baseUrl + '/ordem-servico'

export default {
    async saveAction ({ commit }, ordemServico) {
      try {
        commit('save_request')
        const res = await http.post(ordemServicoUrl, ordemServico)
        const resp = res.data
        const result = resp.ordemServico
  
        commit('save_success', { ordemServico: result })
      } catch (error) {
        commit('save_error')
        throw new Error('save_error')
      }
    }
}