import i18n from '@/i18n'
import config from '@/config'
import { http } from './http'
import EventEmitter from 'events'
import { validate as validateCPF } from 'gerador-validador-cpf'

const eventEmitter = new EventEmitter()
const baseUrl = config.baseUrl

const $utils = {
  eventEmitter,
  toNumber (value) {
    return +value.replace(/[^\d,]/g, '')
  },
  convertToNumber (value) {
    let converted = ''
    const patern = /([\d,]+)/g
    if (value !== void 0 && value != null && patern.test(value)) {
      String(value)
        .match(patern)
        .forEach((num) => {
          converted += num
        })
    }
    return +converted.replace(',', '.').replace(/\.$/, '')
  },
  formRules: {
    cpf: (paramName) => v => (typeof v !== 'undefined' && validateCPF(v)) || i18n.message('INVALID_CPF') ,
    required: (paramName) => v => (~['string', 'number'].indexOf(typeof v) ? !!String(v) : !!v) || i18n.message('MANDATORY_PARAM', { paramName })
  },
  async getAdvogados () {
    return (await http.get(`${baseUrl}/funcionarios`, {
      params: {
        include: JSON.stringify([{ model: 'Cargo', as: 'cargo', required: true, where: { nome: 'Advogado' } }]),
        outFields: JSON.stringify(['id', 'nome'])
      }
    })).data
  },
  async getEtiquetas (geradoPeloSistema = 0) {
    return (await http.get(`${baseUrl}/tiposEtiquetas`, {
      params: {
        where: {
          geradoPeloSistema
        },
        size: -1
      }
    })).data
  },
  contrastDarkOrLight (inputColor) { // retorna dark para cores claras e light para cores escuras
    const color = (inputColor.charAt(0) === '#') ? inputColor.substring(1, 7) : inputColor
    const r = parseInt(color.substring(0, 2), 16)
    const g = parseInt(color.substring(2, 4), 16)
    const b = parseInt(color.substring(4, 6), 16)
    if ((r * 0.299 + g * 0.587 + b * 0.114) > 150) {
      return 'light'
    } else {
      return 'dark'
    }
  },
  diffMinutes (min, max) {
    const Y = (max.year - min.year) * 525600
    const M = (max.month - min.month) * 43800
    const D = (max.day - min.day) * 1440
    const h = (max.hour - min.hour) * 60
    const m = (max.minute - min.minute)

    return Y + M + D + h + m
  },
  escapeHTML (str) {
    const tagsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    }
    return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
  },
  capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
  alert (text, type = 'info') {
    eventEmitter.emit(`Alert`, { type, text })
  }
}
export default {
  install (Vue) {
    Vue.mixin({
      beforeCreate: function () {
        this.$utils = $utils
      }
    })
  }
}
