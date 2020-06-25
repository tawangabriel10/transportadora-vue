import i18n from '@/i18n'
const I18nPlugin = {
  install (Vue) {
    Vue.mixin({
      beforeCreate: function () {
        this.$i18n = i18n
      }
    })
  }
}

export default I18nPlugin
