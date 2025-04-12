import {App} from 'vue'
import Header from './header/index.vue'
import Main from './main/index.vue'
import Footer from './footer/index.vue'

export default {
  install(Vue: App) {
    Vue.component('v-header', Header)
    Vue.component('v-main', Main)
    Vue.component('v-footer', Footer)
  },
}
