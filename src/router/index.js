import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

export const createRouter = () => {
  return new Router({
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }
    }
  })
}
