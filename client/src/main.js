import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask'
import utisPlugin from './pluggables/utils'
import i18n from './i18n'
import I18nPlugin from './pluggables/i18n'
import httpPlugin from '@/pluggables/http'
import { VTextField } from 'vuetify/lib'
import VCurrencyField from 'v-currency-field'
import CustomInput from '@/components/CustomInput'
import CrudBase from '@/components/CrudBase'

import 'vuetify/dist/vuetify.min.css'

i18n.load()
import('@mdi/font/css/materialdesignicons.css')

Vue.config.productionTip = false
Vue.use(utisPlugin)
Vue.use(I18nPlugin)
Vue.use(httpPlugin)
Vue.use(VueTheMask)

Vue.component('crud-base', CrudBase)
Vue.component('custom-input', CustomInput)
Vue.component('v-text-field', VTextField)

Vue.use(VCurrencyField, {
  locale: 'pt-BR',
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0
})

window.CustomError = class CustomError extends Error {}

window.ValidationError = class ValidationError extends Error {
  constructor (code, params = {}, descriptor) {
    super()
    this.$code = code
    this.$params = params
    this.$descriptor = descriptor
    this.message = i18n.getMessage(code, params)
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
