import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4161A4'
      }
    }
  },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
