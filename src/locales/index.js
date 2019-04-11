const files = require.context('.', true, /\.js$/)

import eleEN from 'element-ui/lib/locale/lang/en'
import eleRo from 'element-ui/lib/locale/lang/ro'

let customRo = {}
let customEn = {}
let locale = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  Object.assign(customRo, files(key).default['ro'])
  Object.assign(customEn, files(key).default['en'])
})

function addLang (key, a, b) {
  locale[key] = Object.assign(a, b)
}

addLang('ro', customRo, eleRo)
addLang('en', customEn, eleEN)

export default locale
