import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store/login'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes
})
//
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.userPerfil)) {
    const userData = store.getters.userData(store.state)
    if (store.state.token === null) {
      next({ path: '/' })
    } else if (to.meta.userPerfil.includes(userData.perfil)) {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})

export default router
