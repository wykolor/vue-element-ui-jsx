import Vue from 'vue'
import App from './App.vue'



import KoUI from './../packages';
Vue.use(KoUI)

import './plugins/element.js'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
