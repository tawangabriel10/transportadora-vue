import ptBrMessages from './pt-br-messages'
import ptBrLabels from './pt-br-labels'

const map = {
  'pt-br': {
    messages: ptBrMessages,
    labels: ptBrLabels
  }
}

let singletonI18n = null

const i18n = (language = 'pt-br') => {
  if (singletonI18n) {
    return singletonI18n
  }
  singletonI18n = map[language]
  return singletonI18n
}
const replacer = (str, params = {}) => {
  const pattern = /(\${([\w\d-]+)})/g
  return str.replace(pattern, (a, b, c) => {
    return params[c]
  })
}
export default {
  load (language) {
    return i18n(language)
  },
  label (code, params = {}) {
    return replacer(singletonI18n.labels[code], params)
  },
  message (code, params = {}) {
    return replacer(singletonI18n.messages[code], params)
  },
  getMessage: (code, params = {}) => {
    return replacer(singletonI18n.messages[code], params)
  }
}
