import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import en from '../i18n/en'
import ru from '../i18n/ru'

Vue.use(Vuetify)
const urlParams = (new URL(window.location)).searchParams
const lang = urlParams.get('lang')

export default new Vuetify({
  lang: {
    locales: { ru, en },
    current: lang || 'en'
  }
})
