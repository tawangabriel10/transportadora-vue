import { http } from '@/pluggables/http'
import config from '@/config'

const loginUrl = config.baseUrl + '/login'

export const clearBrowserData = () => {
  // Limpa os cookies
  document.cookie.split(';').forEach(c => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
  })

  localStorage.clear()
}

export default {
  async loginAction ({ commit }, loginData) {
    clearBrowserData()
    try {
      commit('auth_request')
      const res = await http.post(loginUrl, {
        username: loginData.username,
        password: loginData.password
      })
      const user = res.data
      const token = user.token

      localStorage.setItem('userToken', token)
      localStorage.setItem('userData', JSON.stringify(user))

      commit('auth_success', { token, user })
    } catch (error) {
      commit('auth_error')
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      throw new Error('auth_error')
    }
  },
  logoutAction ({ commit }) {
    return new Promise(resolve => {
      commit('logout')
      clearBrowserData()
      resolve()
    })
  }
}
