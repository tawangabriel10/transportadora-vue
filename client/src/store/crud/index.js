import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  actions,
  mutations,
  state: {
    /**
     * Define o estado do widget de loading
     */
    isLoading: false,
    /**
     * Manterá os dados das entities
     */
    data: {},
    /**
     * Manterá os filtros aplicados em cada entity
     */
    filter: {},

    currentEmpresa: null
  }
}
