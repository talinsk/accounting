import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import context from './plugins/ContextMenu'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify'

library.add(faUserSecret)
library.add(faPencilAlt)
library.add(faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(context)

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
