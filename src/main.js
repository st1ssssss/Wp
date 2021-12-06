import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import modal from './plugins/ModalWindow'
import dropModal from './plugins/DropDown'

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(dropModal)

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
