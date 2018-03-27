import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router/index'
import 'lib-flexible/flexible'

require('./assets/css/common.less')

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

export const createApp = () => {
  Vue.config.productionTip = false
  const router = createRouter()
  const app = new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
  })
  return {app, router}
}
