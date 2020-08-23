import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  actions,
  mutations,
  getters: {
    currentEmpresa: state => state && !!state.currentEmpresa
  },
  state: {
    currentEmpresa: JSON.parse(localStorage.getItem('currentEmpresa')) || null
  }
}