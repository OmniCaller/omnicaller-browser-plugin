import {App} from 'vue'
import Header from './header/index.vue'
import Footer from './footer/index.vue'
import Editor from './editor/index.vue'

export default {
  install(Vue: App) {
    Vue.component('v-editor', Editor)
    Vue.component('v-header', Header)
    Vue.component('v-footer', Footer)
  },
}
