import Vue from 'vue'
import App from './App.vue'
import { setRem } from './utils/rem'
import { createRouter } from './router'

setRem(document, window)

/* router & 历史栈 */
let router = createRouter()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
