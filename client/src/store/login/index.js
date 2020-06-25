import actions from './actions'
import mutations from './mutations'
import lodash from 'lodash'

export default {
  namespaced: true,
  actions,
  mutations,
  getters: {
    isLoggedIn: state => state && !!state.token,
    authStatus: state => state && state.status,
    userData: state => {
      const user = lodash.get(state, 'user', {})
      return {
        perfil: user.perfil && user.perfil.nome ? user.perfil.nome : null,
        token: state.token || null,
        usuario: user.usuario || null
      }
    }
  },
  state: {
    status: '',
    token: localStorage.getItem('userToken') || null,
    user: JSON.parse(localStorage.getItem('userData')) || null
  }
}
